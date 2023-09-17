export declare class BioVenomSigner {
  constructor();
  sign(
    unsignedUserOperation: any,
    encodedId: any,
    pubkey: any,
  ): Promise<{
    rs: string[];
    x1: string;
    y1: string;
    x2: string;
    y2: string;
  }>;
}
