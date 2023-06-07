import * as cbor from './cbor';
import * as elliptic from 'elliptic';
import base64url from 'base64url';
import { ECDSASigValue } from '@peculiar/asn1-ecc';
import { AsnParser } from '@peculiar/asn1-schema';
import { AuthenticatorAssertionResponseJSON } from '@simplewebauthn/typescript-types';
import * as utils from './utils';
import { v4 as uuidv4 } from 'uuid';
import { parseAuthData, publicKeyCredentialToJSON } from './helpers';
import { decode, encode } from './base64url-arraybuffer';
import crypto from 'crypto';
import { Buffer } from 'buffer/';
window.Buffer = Buffer;

// import { Buffer as BufferPolyfill } from 'buffer'
// declare var Buffer: typeof BufferPolyfill;
// globalThis.Buffer = BufferPolyfill

export enum COSEKEYS {
  kty = 1,
  alg = 3,
  crv = -1,
  x = -2,
  y = -3,
  n = -1,
  e = -2,
}

export function toHash(data: any, algo = 'SHA256') {
  return crypto.createHash(algo).update(data).digest();
}

export function shouldRemoveLeadingZero(bytes: Uint8Array): boolean {
  return bytes[0] === 0x0 && (bytes[1] & (1 << 7)) !== 0;
}

const EC = elliptic.ec;
const ec = new EC('p256');

export const createCredential = async (
  username: string
): Promise<Credential | null> => {
  console.log('createCredential reached with username', username)
  // const userId = await utils.sha256(new TextEncoder().encode(username));
  const userId = utils.parseBase64url(uuidv4())
  console.log('userId', userId)
  const publicKeyCredential =  await navigator.credentials.create({
    publicKey: {
      rp: {
        id: "localhost",
        name: 'Bio Venom Wallet',
      },
      user: {
        id: userId,
        name: username,
        displayName: username,
      },
      challenge: utils.parseBase64url(uuidv4()),
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      attestation: 'none',
      authenticatorSelection: {
        userVerification: 'required', // Webauthn default is "preferred"
        authenticatorAttachment: 'platform',
      },
    },
  });
  if (publicKeyCredential === null) {
    // alert('Failed to get credential')
    return Promise.reject(new Error('Failed to create credential'))
  }
  return publicKeyCredential;
};

export const getCredential = async (
  credentialId: string,
  challenge: string
): Promise<Credential | null> => {
  console.log('getCredential reached with credentialId', credentialId, 'and challenge', challenge)
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

export const getPublicKey = async (attestationObject: Buffer) => {
  const authData = cbor.decode(attestationObject, undefined, undefined)
    .authData as Uint8Array;

  let authDataParsed = parseAuthData(authData);

  let pubk = cbor.decode(
    authDataParsed.COSEPublicKey.buffer,
    undefined,
    undefined
  );

  const x = pubk[COSEKEYS.x];
  const y = pubk[COSEKEYS.y];

  const pk = ec.keyFromPublic({ x, y });

  const publicKey = [
    '0x' + pk.getPublic('hex').slice(2, 66),
    '0x' + pk.getPublic('hex').slice(-64),
  ];

  return publicKey;
};

export const getAuthenticatorBytes = (attestationObject: Buffer) => {
  const authData = cbor.decode(attestationObject, undefined, undefined)
    .authData as Uint8Array;

  let authDataParsed = authData.slice(0, 37);

  return authDataParsed;
};
function toBase64(base64url) {
  let padding = '';
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const length = base64.length % 4;

  if (length === 2) {
    padding = '==';
  } else if (length === 3) {
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


export const getSignature = async (publicKeyCredential: any) => {
  const publicKeyCredentialParsed =
    publicKeyCredentialToJSON(publicKeyCredential);
  console.log('publicKeyCredentialParsed', publicKeyCredentialParsed)
  const credSignature = publicKeyCredentialParsed.response.signature;
  console.log('credSignature', credSignature)
  const parsedSignature = AsnParser.parse(
    toBuffer(credSignature),
    ECDSASigValue
  );
  console.log('parsedSignature', parsedSignature)

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

export const getSignatureAndFinalMessageToBeSigned = async (credential: any) =>{
    // Extract ClientData, AuthenticatorData and Signature from credential.responce
    const response = credential.response
      const cData = response.clientDataJSON
      const authDataRaw = response.authenticatorData;
      console.log(credential)
      let clientDataJSON = JSON.parse(
        Buffer.from(
          credential.response.clientDataJSON, 
          'base64'
        ).toString('utf8')
      );
      // Convert base64url-encoded challenge to binary string
      let binaryChallenge = atob(clientDataJSON.challenge);

      // Convert binary string to array of bytes
      let byteChallenge = new Uint8Array(binaryChallenge.length);
      for (let i = 0; i < binaryChallenge.length; i++) {
        byteChallenge[i] = binaryChallenge.charCodeAt(i);
      }

      // Convert byte array to string
      let clientMessage = new TextDecoder().decode(byteChallenge);
      console.log("clientMessage", clientMessage)

      //convert authData and clientDataHash to Buffer
      const authData = Buffer.from(authDataRaw, 'base64')
      console.log(`authData: ${authData}`)
      console.log("clientDataJSON", clientDataJSON);

      const value = clientDataJSON.toString('hex').slice(72, 248);
      console.log("value", value);
      const cDataHash = Buffer.from(await utils.sha256Buffer(cData))
      console.log(`cDataHash: ${cDataHash}`)

      // concat authData and clientDataHash to get final data as buffer 
      const finalData = Buffer.concat([authData, cDataHash])

      // hash the finalData to get finalMessageToBeSigned
      const finalMessageToBeSigned =  await utils.sha256(finalData)
    const signature = await getSignature(credential)

    return {message: finalMessageToBeSigned, r: signature[0], s: signature[1]}

}

