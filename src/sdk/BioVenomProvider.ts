import { Address, ProviderRpcClient, TvmException } from 'everscale-inpage-provider';

// For browser environment:
import { EverscaleStandaloneClient } from 'everscale-standalone-client';

export class BioVenomProvider {
  private provider: ProviderRpcClient;
  private walletAbi: any;

  constructor() {
    this.provider = new ProviderRpcClient({
      forceUseFallback: true,
      fallback: () => EverscaleStandaloneClient.create({
        connection: {
          id: 1002, // network id
          group: "venom_mainnet",
          type: 'jrpc',
          data: {
            endpoint: "https://jrpc-devnet.venom.foundation/rpc",
          },
        },
        initInput: '../../node_modules/nekoton-wasm/nekoton_wasm_bg.wasm',
      }),
    });
  }

  public getProvider(): ProviderRpcClient {
    return this.provider;
  }

  public getWalletContract(address: string, abi: any) {
    const contractAddress = new Address(address);
    const contract = new this.provider.Contract(contractAddress, abi);
    return contract;
  }

  public getExpectedContractAddress(deployParams: any) {
    return this.provider.getExpectedAddress(this.walletAbi, deployParams)
  }
}
