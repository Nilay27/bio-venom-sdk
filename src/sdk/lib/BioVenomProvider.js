import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
// For browser environment:
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import { SampleWalletAbi } from "./abis/SampleWalletAbi";
import { BioVenomSigner } from "./BioVenomSigner";
import { BioVenomCookie } from './BioVenomCookie';
import axios from 'axios';
export class BioVenomProvider {
    constructor() {
        // this.provider = new ProviderRpcClient({
        //   forceUseFallback: true,
        //   fallback: () => EverscaleStandaloneClient.create({
        //     connection: {
        //       id: 1002, // network id
        //       group: "dev",
        //       type: 'jrpc',
        //       data: {
        //         endpoint: "https://jrpc-devnet.venom.foundation/rpc",
        //       },
        //     },
        //     initInput: '../../node_modules/nekoton-wasm/nekoton_wasm_bg.wasm',
        //   }),
        // });
        this.walletAbi = SampleWalletAbi;
        this.signer = new BioVenomSigner();
        this.cookie = new BioVenomCookie();
    }
    // public getProvider(): ProviderRpcClient {
    //   return this.provider;
    // }
    getAnyWalletContract(address) {
        const contractAddress = new Address(address);
        const Provider = new ProviderRpcClient({
            forceUseFallback: true,
            fallback: () => EverscaleStandaloneClient.create({
                connection: {
                    id: 1002,
                    group: "dev",
                    type: 'jrpc',
                    data: {
                        endpoint: "https://jrpc-devnet.venom.foundation/rpc",
                    },
                },
                initInput: '../../node_modules/nekoton-wasm/nekoton_wasm_bg.wasm',
            }),
        });
        const contract = new Provider.Contract(this.walletAbi, contractAddress);
        return contract;
    }
    setWalletContract(address) {
        this.walletContract = this.getAnyWalletContract(address);
    }
    getWalletContract() {
        return this.walletContract;
    }
    // public getExpectedContractAddress(deployParams: any) {
    //   return this.provider.getExpectedAddress(this.walletAbi, deployParams)
    // }
    async deployWalletContract(publicKey) {
        try {
            const response = await axios.post('https://venom-sdk-backend-production.up.railway.app/deploy', {
                publicKey: publicKey
            });
            console.log("response from server", response.data);
            // const responseBody = JSON.parse(response.data);
            const walletAddress = response.data.walletAddress;
            this.walletContract = this.getAnyWalletContract(walletAddress);
            return walletAddress;
        }
        catch (error) {
            console.error('Error deploying contract: ', error);
            throw error;
        }
    }
    async createUnsignedUserOp(encodedPayload, value = 0) {
        /**
         * Pass in an encodedPayload if you want to call any arbitrary function on the wallet contract.
         * For example if you want to call the `setState` function on the wallet contract, you would pass in
         * const encodedPayload = await sampleContract.methods.setState({_state: 20}).encodeInternal();
         */
        this.unsignedUserOp = { _signatureOp: '', _payloadOp: encodedPayload, _valueOp: 0 };
        return this.unsignedUserOp;
    }
    async signTvmCellUserOp(unsignedUserOp, encodedId, pubkey) {
        const { rs, x1, y1, x2, y2 } = await this.signer.sign(unsignedUserOp, encodedId, pubkey);
        const encodedSignature = (await this.walletContract.methods.encodeSignatureParams({ r: rs[0], s: rs[1], x1: x1, y1: y1, x2: x2, y2: y2 }).call()).value0;
        this.unsignedUserOp._signatureOp = encodedSignature;
        const signedTVMCellUserOp = (await this.walletContract.methods.encodeUserOperation({ _signatureOp: encodedSignature, _payloadOp: this.unsignedUserOp._payloadOp, _valueOp: 0 }).call()).value0;
        return signedTVMCellUserOp;
    }
    async executeTransaction(destinationAddress, signedTVMCellUserOp, value, bounce = true) {
        console.log("destinationAddress", destinationAddress);
        console.log("signedTVMCellUserOp", signedTVMCellUserOp);
        console.log("value", value);
        console.log("bounce", bounce);
        const response = await this.walletContract.methods.sendTransaction({ dest: destinationAddress, value: value,
            bounce: bounce, userOp: signedTVMCellUserOp }).sendExternal({ withoutSignature: true });
        return response;
    }
}
// TODO: Add registration logic here
// TODO: save the credentials to the cookie
// TODO: Create a server to store the credentials
// TODO: create a utils folder and add constants and other utility functions
//# sourceMappingURL=BioVenomProvider.js.map