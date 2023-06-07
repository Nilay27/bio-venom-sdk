// import { BioVenomProvider } from "./BioVenomProvider";
import { Address, ProviderRpcClient, TvmException } from 'everscale-inpage-provider';
import {EllipticCurveAbi} from "../touch-id-app/abis/EllipticCurveAbi"
import { EverscaleStandaloneClient } from 'everscale-standalone-client';

async function main() {
    const BioVenomProvider = new ProviderRpcClient({
        forceUseFallback: true,
        fallback: () =>
          EverscaleStandaloneClient.create({
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
      console.log("provider", BioVenomProvider)
    const ellipticAddress = new Address("0:99ec691d9ba7bcebf35f1003af227cb4bba02dca70a777c72f47012f1a37bafa")
    const EllipticContract = new BioVenomProvider.Contract(EllipticCurveAbi, ellipticAddress);
    console.log("EllipticContract", EllipticContract)
}

()=>{
    main()
}

