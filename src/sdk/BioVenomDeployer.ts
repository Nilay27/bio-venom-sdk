import { ParamsOfEncodeMessage, ParamsOfProcessMessage, TonClient, abiContract, Signer} from '@eversdk/core';
import { libWeb } from '@eversdk/lib-web';
import {SampleWalletContract} from "./deployHelpers/SampleWalletContract";
import {GiverAbi} from "./deployHelpers/GiverAbi";
import axios from 'axios';



//@ts-ignore
TonClient.useBinaryLibrary(libWeb);
export class BioVenomDeployer {
    private tonClient: TonClient;
    private randomKeysForDeployment? : any;
    private deployOptions?: ParamsOfEncodeMessage;
    private prefundingAmount : number = 50_000_000;

    constructor() {
        // console.log("initialising constructor with giver address: ", giverAddress)
        this.tonClient = new TonClient({
            network: {
                endpoints: ['https://gql-devnet.venom.network/graphql'],
            },
        });
    }

    /**
     * @dev a random signer to calculate the address of the wallet contract and
     * sign the message for deployment
     * @dev this keypair does not need to have any tokens
     * @dev this keypair is not used for signing any user operations or transactions
     * @dev this keypair is only used for deployment
     * @returns randomKeysForDeployment
     */
    public async setRandomKeysForDeployment() {
        this.randomKeysForDeployment = await this.tonClient.crypto.generate_random_sign_keys();
    }

    public setDeployOptions(Q0:string, Q1:string) {
        console.log("reached setDeployOptions")
        const randomSigner = {
            type: 'Keys',
            keys: this.randomKeysForDeployment,
        } as Signer;
        console.log("random signer: ", randomSigner)
        
        // Prepare parameters for deploy message encoding
        // See more info about `encode_message` method parameters here:
        // https://github.com/tonlabs/ever-sdk/blob/master/docs/reference/types-and-methods/mod_abi.md#encode_message
        this.deployOptions = {
            abi: {
                type: 'Contract',
                value: SampleWalletContract.abi,
            },
            deploy_set: {
                tvc: SampleWalletContract.tvc,
                initial_data: {_nonce: Math.floor(Math.random() * 1000000000)},
            },
            call_set: {
                function_name: 'constructor',
                input: {
                    _Q0: Q0,
                    _Q1: Q1,
                },
            },
            signer: randomSigner,
        };
    }

    public async calcWalletAddress(Q0:string, Q1:string): Promise<string>{
        if(!this.randomKeysForDeployment) {
            await this.setRandomKeysForDeployment();
        }
        if(!this.deployOptions || Object.keys(this.deployOptions).length === 0) {
             this.setDeployOptions(Q0, Q1);
        }
        const {address} = await this.tonClient.abi.encode_message(this.deployOptions);
        return address;
    }

    public async deployWalletContract(Q0:string, Q1:string, isPrefunded:boolean): Promise<string> {
        console.log("reached deployWalletContract option")
        if(!this.deployOptions || Object.keys(this.deployOptions).length === 0) {
             this.setDeployOptions(Q0, Q1);
        }
        if(isPrefunded) {
            throw new Error("Wallet not prefunded");
        }
        const address = await this.calcWalletAddress(Q0, Q1);
        console.log("deploying wallet contract");
        await this.tonClient.processing.process_message({
            message_encode_params: this.deployOptions,
            send_events: false,
        });
        console.log(`wallet contract deployed at address ${address}`);
        // reset the deployOptions for fresh deployment in subsequent calls
        this.deployOptions = {} as ParamsOfEncodeMessage;
        return address;
    }

    public async prefundDeployedWalletViaSigner(source:string, dest:string, value:number, giverSigner?:Signer): Promise<boolean>{
        if(giverSigner.type == 'Keys') {
            // ensure giverSigner is not type Keys to avoid exposing private key
            throw new Error("Giver signer cannot be of type Keys");
        }

        console.log(`Transfering ${value} tokens from giver to ${dest}`);
        const params = {
            send_events: false,
            message_encode_params: {
                address: source,
                abi: abiContract(GiverAbi),
                call_set: {
                    function_name: 'sendTransaction',
                    input: {
                        dest,
                        value,
                        bounce: false,
                        flags:0,
                        payload: '',
                    },
                },
                signer: giverSigner,
            },
        } as ParamsOfProcessMessage;
        try{
            await this.tonClient.processing.process_message(params);
        }catch(error){
            console.error('Error transfering tokens from giver to wallet contract: ', error);
            throw error;
        }
        console.log('Success. Tokens were transfered\n');
        return true;
    }

    public async prefundDeployedWalletViaBackend(url:string, dest:string): Promise<boolean>{
        try {
            const response = await axios.post(url, {dest:dest,  amount: this.prefundingAmount});
            console.log("response from server", response.data);
        } catch (error) {
            console.error('Error deploying contract: ', error);
            throw error;
        }
        console.log('Success. Tokens were transfered\n');
        return true;
    }

    public changePrefundingAmount(amount:number) {
        this.prefundingAmount = amount;
    }
}

