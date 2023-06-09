import { Address, ProviderRpcClient, Contract } from 'everscale-inpage-provider';
// For browser environment:
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import {SampleWalletAbi} from "./abis/SampleWalletAbi";
import {BioVenomSigner} from "./BioVenomSigner";

  export class BioVenomProvider {
  private provider: ProviderRpcClient;
  private walletAbi: any;
  private signer: BioVenomSigner;
  private walletContract: any;

  constructor() {
    this.provider = new ProviderRpcClient({
      forceUseFallback: true,
      fallback: () => EverscaleStandaloneClient.create({
        connection: {
          id: 1002, // network id
          group: "dev",
          type: 'jrpc',
          data: {
            endpoint: "https://jrpc-devnet.venom.foundation/rpc",
          },
        },
        initInput: '../../node_modules/nekoton-wasm/nekoton_wasm_bg.wasm',
      }),
    });
    this.walletAbi = SampleWalletAbi;
    this.signer = new BioVenomSigner();
  }

  public getProvider(): ProviderRpcClient {
    return this.provider;
  }

  public getAnyWalletContract(address: string) {
    const contractAddress = new Address(address);
    const contract = new this.provider.Contract(contractAddress, this.walletAbi);
    return contract;
  }

  public getWalletContract() {
    return this.walletContract;
  }

  public getExpectedContractAddress(deployParams: any) {
    return this.provider.getExpectedAddress(this.walletAbi, deployParams)
  }

  public async deployWalletContract(): Promise<string>{
    const signer = (await locklift.keystore.getSigner("0"))!;
    console.log("signer while deploying", signer)
    const { contract: sample } = await locklift.factory.deployContract({
      contract: "SampleWallet",
      publicKey: signer.publicKey,
      initParams: {
        _nonce: locklift.utils.getRandomNonce(),
      },
      constructorParams: {
      },
      value: locklift.utils.toNano(1),
    });
    console.log(`Sample deployed at: ${sample.address.toString()}`);
    this.walletContract = sample;
    return sample.address.toString();
  }
  
  public async createUnsignedTvmCellUserOp(walletContract: any, encodedPayload: any, value: number = 0): Promise<any> {
    /**
     * Pass in an encodedPayload if you want to call any arbitrary function on the wallet contract.
     * For example if you want to call the `setState` function on the wallet contract, you would pass in
     * const encodedPayload = await sampleContract.methods.setState({_state: 20}).encodeInternal();
     */
    const unsignedTvmCellUserOp = (await walletContract.methods.encodeUserOperation({
      _signatureOp: '', 
      _payloadOp: encodedPayload, 
      _valueOp: value}).call()).value0
    return unsignedTvmCellUserOp;
  }
}
