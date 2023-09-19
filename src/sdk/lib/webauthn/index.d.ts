import { Buffer } from 'buffer/';
export declare enum COSEKEYS {
  kty = 1,
  alg = 3,
  crv = -1,
  x = -2,
  y = -3,
  n = -1,
  e = -2,
}
export declare function toHash(data: any, algo?: string): string;
export declare function shouldRemoveLeadingZero(bytes: Uint8Array): boolean;
export declare const createCredential: (username: string) => Promise<Credential | null>;
export declare const getCredential: (credentialId: string, challenge: string) => Promise<Credential | null>;
export declare const getPublicKey: (attestationObject: Buffer) => Promise<string[]>;
export declare const getAuthenticatorBytes: (attestationObject: Buffer) => Uint8Array;
export declare const getSignature: (publicKeyCredential: any) => Promise<string[]>;
export declare const getSignatureAndFinalMessageToBeSigned: (credential: any) => Promise<{
  message: string;
  r: string;
  s: string;
}>;
export declare const getRSAndXYCoordinates: (
  credential: any,
  Q: string[],
) => Promise<{
  rs: string[];
  x1: string;
  y1: string;
  x2: string;
  y2: string;
}>;
