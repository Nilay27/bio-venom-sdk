import { Address, ProviderRpcClient, Contract } from 'everscale-inpage-provider';
import { BioVenomDeployer } from './BioVenomDeployer';
export declare class BioVenomProvider {
  private provider?;
  private walletAbi;
  private signer;
  private walletContract;
  private unsignedUserOp;
  private cookie;
  private bioVenomDeployerInstance;
  private tonClient;
  private walletAddress;
  constructor();
  checkUsername(username: string): Promise<boolean>;
  getProvider(): ProviderRpcClient;
  getAnyWalletContract(address: string): Contract<any>;
  setWalletContract(address: string): void;
  getWalletContract(): any;
  preCalculateAddress(publicKey: any): Promise<string>;
  saveCredentials(): Promise<boolean>;
  deployWalletContract(publicKey: any): Promise<string>;
  createUnsignedUserOp(encodedPayload: any, value?: number): Promise<any>;
  encodeSignatureParams(rs: any, x1: any, y1: any, x2: any, y2: any): Promise<any>;
  encodeUserOperation(encodedSignature: any, encodedPayload: any, value?: number): Promise<any>;
  signTvmCellUserOp(unsignedUserOp: any, encodedId: any, pubkey: any): Promise<any>;
  executeTransaction(destinationAddress: Address, signedTVMCellUserOp: any, value: any, bounce?: boolean): Promise<any>;
  getBioVenomDeployerInstance(): BioVenomDeployer;
}
