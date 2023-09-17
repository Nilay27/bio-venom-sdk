/********************************
     Encoding/Decoding Utils
********************************/
/*
let webCrypto :any = null

export async function getCrypto() {
    if(!webCrypto) {
        console.log(window?.crypto)
        webCrypto = window?.crypto ?? (await import("crypto")).webcrypto
        console.log(webCrypto)
    }
    return webCrypto
}
*/
export function randomChallenge() {
    return crypto.randomUUID();
}
export function toBuffer(txt) {
    console.log('toBuffer reached with txt', txt);
    return Uint8Array.from(txt, (c) => c.charCodeAt(0)).buffer;
}
export function Uint8ArrayToHex(u8a) {
    let hexString = '';
    for (let i = 0; i < u8a.length; i++) {
        hexString += u8a[i].toString(16).padStart(2, '0');
    }
    return hexString;
}
export function parseBuffer(buffer) {
    return String.fromCharCode(...new Uint8Array(buffer));
}
export function isBase64url(txt) {
    return txt.match(/^[a-zA-Z0-9\-_]+=*$/) !== null;
}
export function toBase64url(buffer) {
    const txt = btoa(parseBuffer(buffer)); // base64
    // @ts-ignore
    return txt.replaceAll('+', '-').replaceAll('/', '_');
}
export function parseBase64url(txt) {
    // @ts-ignore
    txt = txt.replaceAll('-', '+').replaceAll('_', '/'); // base64url -> base64
    return toBuffer(atob(txt));
}
export var sha256 = async (data) => {
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const digest = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return '0x' + digest;
};
export var sha256Buffer = async (data) => {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return hashBuffer;
};
export function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
export function concatenateBuffers(buffer1, buffer2) {
    var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp;
}
//# sourceMappingURL=utils.js.map