import { Address, Contract } from 'everscale-inpage-provider';
export declare class BioVenomProvider {
    private provider?;
    private walletAbi;
    private signer;
    private walletContract;
    private unsignedUserOp;
    constructor();
    getAnyWalletContract(address: string): Contract<any>;
    setWalletContract(address: string): void;
    getWalletContract(): any;
    deployWalletContract(publicKey: any): Promise<string>;
    createUnsignedUserOp(encodedPayload: any, value?: number): Promise<any>;
    signTvmCellUserOp(unsignedUserOp: any, encodedId: any, pubkey: any): Promise<any>;
    executeTransaction(destinationAddress: Address, signedTVMCellUserOp: any, value: any, bounce?: boolean): Promise<any>;
}
