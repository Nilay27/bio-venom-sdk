import { Signer } from '@eversdk/core';
export declare class BioVenomDeployer {
    private tonClient;
    private randomKeysForDeployment?;
    private deployOptions?;
    private prefundingAmount;
    constructor();
    /**
     * @dev a random signer to calculate the address of the wallet contract and
     * sign the message for deployment
     * @dev this keypair does not need to have any tokens
     * @dev this keypair is not used for signing any user operations or transactions
     * @dev this keypair is only used for deployment
     * @returns randomKeysForDeployment
     */
    setRandomKeysForDeployment(): Promise<void>;
    setDeployOptions(Q0: string, Q1: string): void;
    calcWalletAddress(Q0: string, Q1: string): Promise<string>;
    deployWalletContract(Q0: string, Q1: string, isPrefunded: boolean): Promise<string>;
    prefundDeployedWalletViaSigner(source: string, dest: string, value: number, giverSigner?: Signer): Promise<boolean>;
    prefundDeployedWalletViaBackend(url: string, dest: string): Promise<boolean>;
    changePrefundingAmount(amount: number): void;
}
