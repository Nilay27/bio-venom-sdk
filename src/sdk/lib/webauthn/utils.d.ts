/********************************
     Encoding/Decoding Utils
********************************/
export declare function randomChallenge(): string;
export declare function toBuffer(txt: string): ArrayBuffer;
export declare function Uint8ArrayToHex(u8a: Uint8Array): string;
export declare function parseBuffer(buffer: ArrayBuffer): string;
export declare function isBase64url(txt: string): boolean;
export declare function toBase64url(buffer: ArrayBuffer): string;
export declare function parseBase64url(txt: string): ArrayBuffer;
export declare var sha256: (data: any) => Promise<string>;
export declare var sha256Buffer: (data: any) => Promise<ArrayBuffer>;
export declare function bufferToHex(buffer: ArrayBuffer): string;
export declare function concatenateBuffers(buffer1: ArrayBuffer, buffer2: ArrayBuffer): Uint8Array;
