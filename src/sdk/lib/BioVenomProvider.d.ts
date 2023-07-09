import { Address, Contract } from 'everscale-inpage-provider';
import { BioVenomDeployer } from './BioVenomDeployer';
export declare class BioVenomProvider {
    private provider?;
    private walletAbi;
    private signer;
    private walletContract;
    private unsignedUserOp;
    private cookie;
    private BioVenomDeployerInstance;
    constructor();
    getAnyWalletContract(address: string): Contract<any>;
    setWalletContract(address: string): void;
    getWalletContract(): any;
    preCalculateAddress(publicKey: any): Promise<string>;
    deployWalletContract(publicKey: any, isPrefunded: boolean): Promise<string>;
    createUnsignedUserOp(encodedPayload: any, value?: number): Promise<any>;
    signTvmCellUserOp(unsignedUserOp: any, encodedId: any, pubkey: any): Promise<any>;
    executeTransaction(destinationAddress: Address, signedTVMCellUserOp: any, value: any, bounce?: boolean): Promise<any>;
    getBioVenomDeployerInstance(): BioVenomDeployer;
}
