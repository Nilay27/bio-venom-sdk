import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
// For browser environment:
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import { SampleWalletContract } from './deployHelpers/SampleWalletContract';
import { BioVenomSigner } from './BioVenomSigner';
import { BioVenomCookie } from './BioVenomCookie';
import { BioVenomDeployer } from './BioVenomDeployer';
import * as Constants from './Constants';
export class BioVenomProvider {
  constructor() {
    this.walletAddress = '';
    this.bioVenomDeployerInstance = new BioVenomDeployer();
    this.tonClient = this.bioVenomDeployerInstance.getTonClient();
    this.walletAbi = SampleWalletContract.abi;
    this.signer = new BioVenomSigner();
    this.cookie = new BioVenomCookie();
    this.provider = new ProviderRpcClient({
      forceUseFallback: true,
      fallback: () =>
        EverscaleStandaloneClient.create({
          connection: {
            id: 1002,
            group: 'dev',
            type: 'jrpc',
            data: {
              endpoint: Constants.TestnetRPC,
            },
          },
        }),
    });
    const userName = localStorage.getItem('username');
    const credential = JSON.parse(localStorage.getItem(userName) || '{}');
    // if credential is null or credential.walletAddress is null, set wallet address to empty string else set it to credential.walletAddress
    if (!credential || !credential.walletAddress) {
      this.walletAddress = '';
    } else {
      this.walletAddress = credential.walletAddress;
    }
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
    console.log('reached preCalculateAddress in BioVenomProvider');
    console.log('preCalculating wallet address');
    const preCalculatedAddress = await this.bioVenomDeployerInstance.calcWalletAddress(publicKey[0], publicKey[1]);
    console.log('preCalculated walletAddress: ', preCalculatedAddress);
    this.setWalletContract(preCalculatedAddress);
    return preCalculatedAddress;
  }
  async deployWalletContract(publicKey) {
    // requires that the wallet contract is prefunded
    try {
      const walletAddress = await this.bioVenomDeployerInstance.deployWalletContract(publicKey[0], publicKey[1]);
      console.log('wallet deployed at: ', walletAddress);
      this.walletAddress = walletAddress;
      return walletAddress;
    } catch (error) {
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
    this.unsignedUserOp = {
      _signatureOp: '',
      _payloadOp: encodedPayload,
      _valueOp: 0,
    };
    return this.unsignedUserOp;
  }
  async encodeSignatureParams(rs, x1, y1, x2, y2) {
    const clientEncodedSignature = await this.tonClient.abi.encode_boc({
      params: [
        { name: 'r', type: 'uint256' },
        { name: 's', type: 'uint256' },
        { name: 'x1', type: 'uint256' },
        { name: 'y1', type: 'uint256' },
        { name: 'x2', type: 'uint256' },
        { name: 'y2', type: 'uint256' },
      ],
      data: {
        r: rs[0],
        s: rs[1],
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
      },
    });
    console.log('clientEncodedSignature', clientEncodedSignature);
    return clientEncodedSignature.boc;
  }
  // do the same as above to encode useroperation
  async encodeUserOperation(encodedSignature, encodedPayload, value = 0) {
    const nonce = (await this.bioVenomDeployerInstance.runGetMethod('getNonce', this.walletAddress)).value0;
    console.log('nonce', nonce);
    const clientEncodedUserOperation = await this.tonClient.abi.encode_boc({
      params: [
        { name: '_nonce', type: 'uint256' },
        { name: '_signatureOp', type: 'cell' },
        { name: '_payloadOp', type: 'cell' },
        { name: '_valueOp', type: 'uint128' },
      ],
      data: {
        _nonce: nonce,
        _signatureOp: encodedSignature,
        _payloadOp: encodedPayload,
        _valueOp: value,
      },
    });
    return clientEncodedUserOperation.boc;
  }
  async signTvmCellUserOp(unsignedUserOp, encodedId, pubkey) {
    const { rs, x1, y1, x2, y2 } = await this.signer.sign(unsignedUserOp, encodedId, pubkey);
    const encodedSignature = await this.encodeSignatureParams(rs, x1, y1, x2, y2);
    this.unsignedUserOp._signatureOp = encodedSignature;
    const signedTVMCellUserOp = await this.encodeUserOperation(encodedSignature, this.unsignedUserOp._payloadOp, 0);
    return signedTVMCellUserOp;
  }
  async executeTransaction(destinationAddress, signedTVMCellUserOp, value, bounce = true) {
    console.log('destinationAddress', destinationAddress);
    console.log('signedTVMCellUserOp', signedTVMCellUserOp);
    console.log('value', value);
    console.log('bounce', bounce);
    const params = {
      send_events: false,
      message_encode_params: {
        address: this.walletAddress,
        abi: {
          type: 'Contract',
          value: this.walletAbi,
        },
        call_set: {
          function_name: 'sendTransaction',
          input: {
            dest: destinationAddress.toString(),
            value: value,
            bounce: bounce,
            userOp: signedTVMCellUserOp,
          },
        },
        signer: { type: 'None' },
      },
    };
    try {
      const response = await this.tonClient.processing.process_message(params);
      return response;
    } catch (error) {
      console.error('Error executing transaction:', error);
      throw error; // Re-throw the error so it can be caught in the UI or by the calling function.
    }
  }
  getBioVenomDeployerInstance() {
    return this.bioVenomDeployerInstance;
  }
}
//583175822eb7355d5554cd6d6464cea5a6bd714e69b5395a4c021a8377a1b4a0
// TODO: Add registration logic here
// TODO: save the credentials to the cookie
// TODO: create a utils folder and add constants and other utility functions
// "Invalid ABI specified: Wrong data format in `_payloadOp` parameter:
//# sourceMappingURL=BioVenomProvider.js.map
