import { Address, ProviderRpcClient, TvmException } from 'everscale-inpage-provider';
// For browser environment:
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import {WalletAbi} from "../abis/WalletAbi";

  export class BioVenomProvider {
  private provider: ProviderRpcClient;
  private walletAbi: any;

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
    this.walletAbi = WalletAbi;
  }

  public getProvider(): ProviderRpcClient {
    return this.provider;
  }

  public getWalletContract(address: string) {
    const contractAddress = new Address(address);
    const contract = new this.provider.Contract(contractAddress, this.walletAbi);
    return contract;
  }

  public getExpectedContractAddress(deployParams: any) {
    return this.provider.getExpectedAddress(this.walletAbi, deployParams)
  }

  // public async deployWalletContract() {
  //   const signer = (await locklift.keystore.getSigner("0"))!;
  //   console.log("signer while deploying", signer)
  //   //   const ellipticAddress = new Address("0:7614152f2a4c61fc0c53bfc82906d61e33d585bb3208d3229d8580d4fb289ba1")
  //   const { contract: sample, tx } = await locklift.factory.deployContract({
  //       contract: "SampleWallet",
  //       publicKey: signer.publicKey,
  //       initParams: {
  //       _nonce: locklift.utils.getRandomNonce(),
  //       },
  //       constructorParams: {
  //       },
  //       value: locklift.utils.toNano(1),
  //   });
  //   return sample;
  // }
}
