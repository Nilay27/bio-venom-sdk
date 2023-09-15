import * as cbor from './cbor';
import * as elliptic from 'elliptic';
import { ECDSASigValue } from '@peculiar/asn1-ecc';
import { AsnParser } from '@peculiar/asn1-schema';
import * as utils from './utils';
import { v4 as uuidv4 } from 'uuid';
import { parseAuthData, publicKeyCredentialToJSON } from './helpers';
import { decode } from './base64url-arraybuffer';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer/';
// @ts-ignore
window.Buffer = Buffer;
import BN from 'bn.js';
// import { Buffer as BufferPolyfill } from 'buffer'
// declare var Buffer: typeof BufferPolyfill;
// globalThis.Buffer = BufferPolyfill
export var COSEKEYS;
(function (COSEKEYS) {
    COSEKEYS[COSEKEYS["kty"] = 1] = "kty";
    COSEKEYS[COSEKEYS["alg"] = 3] = "alg";
    COSEKEYS[COSEKEYS["crv"] = -1] = "crv";
    COSEKEYS[COSEKEYS["x"] = -2] = "x";
    COSEKEYS[COSEKEYS["y"] = -3] = "y";
    COSEKEYS[COSEKEYS["n"] = -1] = "n";
    COSEKEYS[COSEKEYS["e"] = -2] = "e";
})(COSEKEYS || (COSEKEYS = {}));
export function toHash(data, algo = 'SHA256') {
    return CryptoJS.SHA256(data).toString();
}
export function shouldRemoveLeadingZero(bytes) {
    return bytes[0] === 0x0 && (bytes[1] & (1 << 7)) !== 0;
}
const EC = elliptic.ec;
const ec = new EC('p256');
export const createCredential = async (username) => {
    console.log('createCredential reached with username', username);
    // const userId = await utils.sha256(new TextEncoder().encode(username));
    const userId = utils.parseBase64url(uuidv4());
    const pubKeyCredParams = { type: 'public-key', alg: -7 };
    const isPlatformSupported = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    const authenticationSupport = isPlatformSupported ? 'platform' : 'cross-platform';
    console.log('pubKeyCredParams', pubKeyCredParams);
    console.log('userId', userId);
    const publicKeyCredential = await navigator.credentials.create({
        publicKey: {
            rp: {
                id: window.location.hostname,
                name: 'Bio Venom Wallet',
            },
            user: {
                id: userId,
                name: username,
                displayName: username,
            },
            challenge: utils.parseBase64url(uuidv4()),
            pubKeyCredParams: [pubKeyCredParams],
            attestation: 'none',
            authenticatorSelection: {
                userVerification: 'required',
                authenticatorAttachment: authenticationSupport,
            },
        },
    });
    if (publicKeyCredential === null) {
        // alert('Failed to get credential')
        return Promise.reject(new Error('Failed to create credential'));
    }
    return publicKeyCredential;
};
export const getCredential = async (credentialId, challenge) => {
    console.log('getCredential reached with credentialId', credentialId, 'and challenge', challenge);
    let challengeBuffer = Uint8Array.from(challenge, (c) => c.charCodeAt(0)).buffer;
    return navigator.credentials.get({
        publicKey: {
            challenge: challengeBuffer,
            timeout: 60000,
            userVerification: 'required',
            allowCredentials: [
                {
                    id: decode(credentialId),
                    type: 'public-key',
                    // transports: ['internal'],
                },
            ],
        },
    });
};
export const getPublicKey = async (attestationObject) => {
    const authData = cbor.decode(attestationObject, undefined, undefined)
        .authData;
    let authDataParsed = parseAuthData(authData);
    let pubk = cbor.decode(
    // @ts-ignore
    authDataParsed.COSEPublicKey.buffer, undefined, undefined);
    const x = pubk[COSEKEYS.x];
    const y = pubk[COSEKEYS.y];
    const pk = ec.keyFromPublic({ x, y });
    const publicKey = [
        '0x' + pk.getPublic('hex').slice(2, 66),
        '0x' + pk.getPublic('hex').slice(-64),
    ];
    return publicKey;
};
export const getAuthenticatorBytes = (attestationObject) => {
    const authData = cbor.decode(attestationObject, undefined, undefined)
        .authData;
    let authDataParsed = authData.slice(0, 37);
    return authDataParsed;
};
function toBase64(base64url) {
    let padding = '';
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const length = base64.length % 4;
    if (length === 2) {
        padding = '==';
    }
    else if (length === 3) {
        padding = '=';
    }
    return base64 + padding;
}
function toBuffer(base64url) {
    const base64 = toBase64(base64url);
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}
export const getSignature = async (publicKeyCredential) => {
    const publicKeyCredentialParsed = publicKeyCredentialToJSON(publicKeyCredential);
    console.log('publicKeyCredentialParsed', publicKeyCredentialParsed);
    const credSignature = publicKeyCredentialParsed.response.signature;
    console.log('credSignature', credSignature);
    const parsedSignature = AsnParser.parse(toBuffer(credSignature), ECDSASigValue);
    console.log('parsedSignature', parsedSignature);
    let rBytes = new Uint8Array(parsedSignature.r);
    let sBytes = new Uint8Array(parsedSignature.s);
    if (shouldRemoveLeadingZero(rBytes)) {
        rBytes = rBytes.slice(1);
    }
    if (shouldRemoveLeadingZero(sBytes)) {
        sBytes = sBytes.slice(1);
    }
    const signature = [
        '0x' + utils.Uint8ArrayToHex(rBytes),
        '0x' + utils.Uint8ArrayToHex(sBytes),
    ];
    return signature;
};
export const getSignatureAndFinalMessageToBeSigned = async (credential) => {
    // Extract ClientData, AuthenticatorData and Signature from credential.responce
    const response = credential.response;
    const cData = response.clientDataJSON;
    const authDataRaw = response.authenticatorData;
    console.log(credential);
    let clientDataJSON = JSON.parse(Buffer.from(credential.response.clientDataJSON, 'base64').toString('utf8'));
    // Convert base64url-encoded challenge to binary string
    let binaryChallenge = atob(clientDataJSON.challenge);
    // Convert binary string to array of bytes
    let byteChallenge = new Uint8Array(binaryChallenge.length);
    for (let i = 0; i < binaryChallenge.length; i++) {
        byteChallenge[i] = binaryChallenge.charCodeAt(i);
    }
    // Convert byte array to string
    let clientMessage = new TextDecoder().decode(byteChallenge);
    console.log("clientMessage", clientMessage);
    //convert authData and clientDataHash to Buffer
    const authData = Buffer.from(authDataRaw, 'base64');
    console.log(`authData: ${authData}`);
    console.log("clientDataJSON", clientDataJSON);
    const value = clientDataJSON.toString('hex').slice(72, 248);
    console.log("value", value);
    const cDataHash = Buffer.from(await utils.sha256Buffer(cData));
    console.log(`cDataHash: ${cDataHash}`);
    // concat authData and clientDataHash to get final data as buffer 
    const finalData = Buffer.concat([authData, cDataHash]);
    const hexArrData = finalData.toString('hex');
    console.log(`finalData unhashed data: ${hexArrData}`);
    // hash the finalData to get finalMessageToBeSigned
    const finalMessageToBeSigned = await utils.sha256(finalData);
    const signature = await getSignature(credential);
    console.log("r", signature[0]);
    console.log("s", signature[1]);
    return { message: finalMessageToBeSigned, r: signature[0], s: signature[1] };
};
export const getRSAndXYCoordinates = async (credential, Q) => {
    console.log("Q value in getRSAndXYCoordinates", Q);
    // get signature and finalMessageToBeSigned
    const { message, r, s } = await getSignatureAndFinalMessageToBeSigned(credential);
    console.log("final message to be signed", message);
    // get public key
    const N = ec.curve.n;
    console.log(N.toString(10));
    const rs0 = new BN(r.slice(2), 16); // Remove the "0x" prefix
    const rs1 = new BN(s.slice(2), 16); // Remove the "0x" prefix
    const Q0 = new BN(Q[0].slice(2), 16); // Remove the "0x" prefix
    const Q1 = new BN(Q[1].slice(2), 16); // Remove the "0x" prefix
    const curvePoint = ec.curve.point(Q0, Q1);
    console.log("isOnCurve", curvePoint.validate());
    const sInv = rs1.invm(N);
    const point1 = ec.g.mul(new BN(message.slice(2), 16).mul(sInv).mod(N));
    const x1 = '0x' + (point1.getX()).toString(16);
    const y1 = '0x' + (point1.getY()).toString(16);
    const point2 = curvePoint.mul(rs0.mul(sInv).mod(N));
    const x2 = '0x' + (point2.getX()).toString(16);
    const y2 = '0x' + (point2.getY()).toString(16);
    return { rs: [r, s], x1: x1, y1: y1, x2: x2, y2: y2 };
};
//# sourceMappingURL=index.js.map