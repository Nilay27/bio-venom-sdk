import { Address, ProviderRpcClient, Contract } from 'everscale-inpage-provider';
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
    getProvider(): ProviderRpcClient;
    getAnyWalletContract(address: string): Contract<any>;
    setWalletContract(address: string): void;
    getWalletContract(): any;
    preCalculateAddress(publicKey: any): Promise<string>;
    deployWalletContract(publicKey: any): Promise<string>;
    createUnsignedUserOp(encodedPayload: any, value?: number): Promise<any>;
    signTvmCellUserOp(unsignedUserOp: any, encodedId: any, pubkey: any): Promise<any>;
    executeTransaction(destinationAddress: Address, signedTVMCellUserOp: any, value: any, bounce?: boolean): Promise<any>;
    getBioVenomDeployerInstance(): BioVenomDeployer;
}
/**
 * public
:
"24d51af2b22d4b8b412c2b774bd3049c9b99873e1f86734a4de39497f2cd0d1a"
secret
:
"9710b0f0e9e4383485a66843b6b6de1c95bde42d0156c4818d1c182f922b5cf5"
[[Prototype]]
:
Object
 *

 */ 
