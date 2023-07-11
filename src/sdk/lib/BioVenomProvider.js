import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
// For browser environment:
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import { SampleWalletAbi } from "./abis/SampleWalletAbi";
import { BioVenomSigner } from "./BioVenomSigner";
import { BioVenomCookie } from './BioVenomCookie';
import { BioVenomDeployer } from './BioVenomDeployer';
export class BioVenomProvider {
    constructor() {
        this.BioVenomDeployerInstance = new BioVenomDeployer();
        this.walletAbi = SampleWalletAbi;
        this.signer = new BioVenomSigner();
        this.cookie = new BioVenomCookie();
        this.provider = new ProviderRpcClient({
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
            }),
        });
    }
    getProvider() {
        return this.provider;
    }
    getAnyWalletContract(address) {
        const contractAddress = new Address(address);
        const contract = new this.provider.Contract(this.walletAbi, contractAddress);
        return contract;
    }
    setWalletContract(address) {
        this.walletContract = this.getAnyWalletContract(address);
    }
    getWalletContract() {
        return this.walletContract;
    }
    async preCalculateAddress(publicKey) {
        console.log("reached preCalculateAddress in BioVenomProvider");
        console.log("preCalculating wallet address");
        const preCalculatedAddress = await this.BioVenomDeployerInstance.calcWalletAddress(publicKey[0], publicKey[1]);
        console.log("preCalculated walletAddress: ", preCalculatedAddress);
        this.setWalletContract(preCalculatedAddress);
        return preCalculatedAddress;
    }
    async deployWalletContract(publicKey) {
        // requires that the wallet contract is prefunded
        try {
            const walletAddress = await this.BioVenomDeployerInstance.deployWalletContract(publicKey[0], publicKey[1]);
            console.log("wallet deployed at: ", walletAddress);
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
    getBioVenomDeployerInstance() {
        return this.BioVenomDeployerInstance;
    }
}
// TODO: Add registration logic here
// TODO: save the credentials to the cookie
// TODO: create a utils folder and add constants and other utility functions
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
//# sourceMappingURL=BioVenomProvider.js.map