export declare var bufferToString: (buff: any) => string;
export declare var getEndian: () => 'big' | 'little';
export declare var readBE16: (buffer: any) => number;
export declare var readBE32: (buffer: any) => number;
export declare var bufToHex: (buffer: any) => any;
export declare var parseAuthData: (buffer: any) => {
  rpIdHash: any;
  flagsBuf: any;
  flags: {
    up: boolean;
    uv: boolean;
    at: boolean;
    ed: boolean;
    flagsInt: any;
  };
  counter: number;
  counterBuf: any;
  aaguid: any;
  credID: any;
  COSEPublicKey: any;
};
export declare var generateRandomBuffer: (length: any) => Uint8Array;
export declare var publicKeyCredentialToJSON: any;
export declare var preformatMakeCredReq: (makeCredReq: any) => any;
export declare var preformatGetAssertReq: (getAssert: any) => any;
