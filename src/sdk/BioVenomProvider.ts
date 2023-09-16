import { Address, ProviderRpcClient, Contract } from 'everscale-inpage-provider';
// For browser environment:
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import {SampleWalletContract} from "./deployHelpers/SampleWalletContract";
import {BioVenomSigner} from "./BioVenomSigner";
import { BioVenomCookie } from './BioVenomCookie';
import { BioVenomDeployer } from './BioVenomDeployer';
import * as Constants from './Constants';
import { Signer, TonClient, ParamsOfEncodeMessage, ParamsOfProcessMessage } from '@eversdk/core';


export class BioVenomProvider {
  private provider?: ProviderRpcClient;
  private walletAbi: any;
  private signer: BioVenomSigner;
  private walletContract: any;
  private unsignedUserOp:any;
  private cookie: BioVenomCookie;
  private bioVenomDeployerInstance: BioVenomDeployer;
  private tonClient:TonClient;
  private walletAddress: string = '';

  constructor() {
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
            id: 1002, // network id
            group: "dev",
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

  public getProvider(): ProviderRpcClient {
    return this.provider;
  }

  public getAnyWalletContract(address: string) {
    const contractAddress = new Address(address);
    const contract = new this.provider.Contract(this.walletAbi, contractAddress);
    return contract;
  }

  public setWalletContract(address: string) {
    this.walletContract = this.getAnyWalletContract(address);
  }

  public getWalletContract() {
    return this.walletContract;
  }

  public async preCalculateAddress(publicKey:any): Promise<string>{
    console.log("reached preCalculateAddress in BioVenomProvider")
    console.log("preCalculating wallet address")
    const preCalculatedAddress = await this.bioVenomDeployerInstance.calcWalletAddress(publicKey[0], publicKey[1]);
    console.log("preCalculated walletAddress: ", preCalculatedAddress)
    this.setWalletContract(preCalculatedAddress);
    return preCalculatedAddress;
  }

  public async deployWalletContract(publicKey:any): Promise<string>{
    // requires that the wallet contract is prefunded
    try{
      const walletAddress = await this.bioVenomDeployerInstance.deployWalletContract(publicKey[0], publicKey[1]);
      console.log("wallet deployed at: ", walletAddress)
      this.walletAddress = walletAddress;
      return walletAddress;
    } catch (error) {
      console.error('Error deploying contract: ', error);
      throw error;
    }
  }
  
  public async createUnsignedUserOp(encodedPayload: any, value: number = 0): Promise<any> {
    /**
     * Pass in an encodedPayload if you want to call any arbitrary function on the wallet contract.
     * For example if you want to call the `setState` function on the wallet contract, you would pass in
     * const encodedPayload = await sampleContract.methods.setState({_state: 20}).encodeInternal();
     */
    this.unsignedUserOp = { _signatureOp: '', _payloadOp: encodedPayload, _valueOp: 0}
    return this.unsignedUserOp;
  }

  public async encodeSignatureParams(rs: any, x1: any, y1: any, x2: any, y2: any): Promise<any> {
    const clientEncodedSignature = (await this.tonClient.abi.encode_boc({
      params: [
        {name: "r", type: "uint256"},
        {name: "s", type: "uint256"},
        {name: "x1", type: "uint256"},
        {name: "y1", type: "uint256"},
        {name: "x2", type: "uint256"},
        {name: "y2", type: "uint256"}
      ],
      data:{
        "r": rs[0],
        "s": rs[1],
        "x1": x1,
        "y1": y1,
        "x2": x2,
        "y2": y2
      }
    }))
    console.log("clientEncodedSignature", clientEncodedSignature)
    return clientEncodedSignature.boc;
  }

  // do the same as above to encode useroperation
  public async encodeUserOperation(encodedSignature: any, encodedPayload: any, value: number = 0): Promise<any> {
    const nonce = (await this.bioVenomDeployerInstance.runGetMethod('getNonce', this.walletAddress)).value0;
    console.log("nonce", nonce)
    
    const clientEncodedUserOperation = (await this.tonClient.abi.encode_boc({
      params: [
        {name: "_nonce", type: "uint256"},
        {name: "_signatureOp", type: "cell"},
        {name: "_payloadOp", type: "cell"},
        {name: "_valueOp", type: "uint128"}
       
      ],
      data:{
        "_nonce": nonce,
        "_signatureOp": encodedSignature,
        "_payloadOp": encodedPayload,
        "_valueOp": value,
      }
    }))
    return clientEncodedUserOperation.boc;
  }


  public async signTvmCellUserOp(unsignedUserOp: any, encodedId:any, pubkey: any): Promise<any> {
    const {rs, x1, y1, x2, y2} = await this.signer.sign(unsignedUserOp, encodedId, pubkey);
    const encodedSignature = await this.encodeSignatureParams(rs, x1, y1, x2, y2);
    this.unsignedUserOp._signatureOp = encodedSignature;
    const signedTVMCellUserOp = await this.encodeUserOperation(encodedSignature, this.unsignedUserOp._payloadOp, 0);
    return signedTVMCellUserOp;
  }

  public async executeTransaction(destinationAddress: Address, signedTVMCellUserOp: any, value: any, bounce: boolean = true): Promise<any> {
    console.log("destinationAddress", destinationAddress)
    console.log("signedTVMCellUserOp", signedTVMCellUserOp)
    console.log("value", value)
    console.log("bounce", bounce)
    const params = {
      send_events: false,
      message_encode_params: {
        address:  this.walletAddress,
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
            userOp: signedTVMCellUserOp
          }
        } ,
        signer: { type: 'None'} as Signer,
      } as ParamsOfEncodeMessage,
    } as ParamsOfProcessMessage
    const response = await this.tonClient.processing.process_message(params);
    return response;
  }

  public getBioVenomDeployerInstance(): BioVenomDeployer {
    return this.bioVenomDeployerInstance;
  }
}
//583175822eb7355d5554cd6d6464cea5a6bd714e69b5395a4c021a8377a1b4a0
  // TODO: Add registration logic here
  // TODO: save the credentials to the cookie
  // TODO: create a utils folder and add constants and other utility functions
// "Invalid ABI specified: Wrong data format in `_payloadOp` parameter: