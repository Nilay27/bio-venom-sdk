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

export function toBuffer(txt: string): ArrayBuffer {
  console.log('toBuffer reached with txt', txt);
  return Uint8Array.from(txt, (c) => c.charCodeAt(0)).buffer;
}

export function Uint8ArrayToHex(u8a: Uint8Array): string {
  let hexString = '';
  for (let i = 0; i < u8a.length; i++) {
    hexString += u8a[i].toString(16).padStart(2, '0');
  }
  return hexString;
}

export function parseBuffer(buffer: ArrayBuffer): string {
  return String.fromCharCode(...new Uint8Array(buffer));
}

export function isBase64url(txt: string): boolean {
  return txt.match(/^[a-zA-Z0-9\-_]+=*$/) !== null;
}

export function toBase64url(buffer: ArrayBuffer): string {
  const txt = btoa(parseBuffer(buffer)); // base64
  // @ts-ignore
  return txt.replaceAll('+', '-').replaceAll('/', '_');
}

export function parseBase64url(txt: string): ArrayBuffer {
  // @ts-ignore
  txt = txt.replaceAll('-', '+').replaceAll('_', '/'); // base64url -> base64
  return toBuffer(atob(txt));
}

export var sha256 = async (data: any) => {
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  const digest = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return '0x' + digest;
};

export var sha256Buffer = async (data: any) => {
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return hashBuffer;
};

export function bufferToHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function concatenateBuffers(buffer1: ArrayBuffer, buffer2: ArrayBuffer) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp;
}
