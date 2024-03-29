import { ParamsOfEncodeMessage, ParamsOfProcessMessage, TonClient, abiContract, Signer, KeyPair } from '@eversdk/core';
import { libWeb } from '@eversdk/lib-web';
import { SampleWalletContract } from './deployHelpers/SampleWalletContract';
import { GiverAbi } from './deployHelpers/GiverAbi';
import axios from 'axios';
import { Buffer } from 'buffer/';
import nacl from 'tweetnacl';
import * as Constants from './Constants';

//@ts-ignore
TonClient.useBinaryLibrary(libWeb);
export class BioVenomDeployer {
  private tonClient: TonClient;
  private randomKeysForDeployment?: KeyPair;
  private deployOptions?: ParamsOfEncodeMessage;
  private prefundingAmount: number = 50_000_000;

  constructor() {
    // console.log("initialising constructor with giver address: ", giverAddress)
    this.tonClient = new TonClient({
      network: {
        endpoints: [Constants.TestnetGraphQL],
      },
    });
    const keyPair = nacl.sign.keyPair();
    const privateKeyOnly = keyPair.secretKey.slice(0, nacl.sign.publicKeyLength);

    this.randomKeysForDeployment = {
      public: Buffer.from(keyPair.publicKey).toString('hex'),
      secret: Buffer.from(privateKeyOnly).toString('hex'),
    };
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

  public setDeployOptions(Q0: string, Q1: string) {
    console.log('reached setDeployOptions');
    const randomSigner = {
      type: 'Keys',
      keys: this.randomKeysForDeployment,
    } as Signer;
    console.log('random signer: ', randomSigner);

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
        initial_data: { _nonce: Math.floor(Math.random() * 1000000000) },
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

  public getTonClient() {
    return this.tonClient;
  }

  public async calcWalletAddress(Q0: string, Q1: string): Promise<string> {
    console.log('reached calculating address');
    if (!this.randomKeysForDeployment) {
      console.log('random keys for deployment not set in calcWalletAddress');
      await this.setRandomKeysForDeployment();
    }
    if (!this.deployOptions || Object.keys(this.deployOptions).length === 0) {
      this.setDeployOptions(Q0, Q1);
    }
    const { address } = await this.tonClient.abi.encode_message(this.deployOptions);
    return address;
  }

  public async deployWalletContract(Q0: string, Q1: string): Promise<string> {
    console.log('reached deployWalletContract option');
    console.log('keys while deploying: ', this.randomKeysForDeployment);
    if (!this.randomKeysForDeployment) {
      throw new Error('random keys for deployment not set');
    }
    if (!this.deployOptions || Object.keys(this.deployOptions).length === 0) {
      console.log('deploy options not set');
      this.setDeployOptions(Q0, Q1);
    }
    const address = await this.calcWalletAddress(Q0, Q1);
    console.log('address of wallet to be deployed: ', address);
    const balanceHex = await this.getAccountBalance(address);
    const balance = BigInt(balanceHex);
    console.log('balance of wallet to be deployed', balance);
    if (balance == BigInt(0)) {
      throw new Error(`Wallet not prefunded, it has ${balance} tokens`);
    }

    console.log('deploying wallet contract at address: ', address);
    await this.tonClient.processing.process_message({
      message_encode_params: this.deployOptions,
      send_events: false,
    });
    console.log(`wallet contract deployed at address ${address}`);
    // reset the deployOptions for fresh deployment in subsequent calls
    this.deployOptions = {} as ParamsOfEncodeMessage;
    return address;
  }

  public async prefundDeployedWalletViaSigner(
    source: string,
    dest: string,
    value: number,
    giverSigner?: Signer,
  ): Promise<boolean> {
    if (giverSigner.type == 'Keys') {
      // ensure giverSigner is not type Keys to avoid exposing private key
      throw new Error('Giver signer cannot be of type Keys');
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
            flags: 0,
            payload: '',
          },
        },
        signer: giverSigner,
      },
    } as ParamsOfProcessMessage;
    try {
      await this.tonClient.processing.process_message(params);
    } catch (error) {
      console.error('Error transfering tokens from giver to wallet contract: ', error);
      throw error;
    }
    console.log('Success. Tokens were transfered\n');
    return true;
  }

  public async prefundDeployedWalletViaBackend(url: string, dest: string): Promise<boolean> {
    // check if dest is already prefunded by checking balance, if balance > 0, return
    const balance = await this.getAccountBalance(dest);
    // TODO: remove this logic in future and ensure handling in UI
    if (parseInt(balance) > 0) {
      console.log('wallet already prefunded');
      return true;
    }
    console.log(`Transfering ${this.prefundingAmount} tokens from giver to ${dest}`);
    try {
      const response = await axios.post(url, {
        dest: dest,
        amount: this.prefundingAmount,
      });

      // check the status code of the response
      if (response.status !== 200) {
        throw new Error('Server returned status code ' + response.status);
      }

      console.log('response from server', response.data);
    } catch (error) {
      console.error('Error deploying contract: ', error);
      throw error;
    }
    console.log('Success. Tokens were transfered\n');
    return true;
  }

  public changePrefundingAmount(amount: number) {
    this.prefundingAmount = amount;
  }

  public async getAccountBalance(address: string): Promise<string> {
    try {
      const result = await this.tonClient.net.query_collection({
        collection: 'accounts',
        filter: {
          id: { eq: address },
        },
        result: 'balance',
      });
      console.log('result: ', result);
      const balance = result.result[0].balance;
      return balance;
    } catch (error) {
      console.error('Error getting balance: ', error);
      throw error;
    }
  }

  public async getAccount(address: string): Promise<any> {
    try {
      // `boc` or bag of cells - native blockchain data layout. Account's boc contains full account state (code and data) that
      // we will need to execute get methods.
      const query = `
                query {
                  blockchain {
                    account(
                      address: "${address}"
                    ) {
                       info {
                        boc
                      }
                    }
                  }
                }`;

      const { result } = await this.tonClient.net.query({ query });

      // It's a good practice to check if the expected data structure is present before accessing it.
      if (
        result &&
        result.data &&
        result.data.blockchain &&
        result.data.blockchain.account &&
        result.data.blockchain.account.info
      ) {
        return result.data.blockchain.account.info;
      } else {
        throw new Error('Unexpected data structure returned from the query.');
      }
    } catch (error) {
      console.error('Error fetching account info:', error);
      throw error; // Re-throw the error so that it can be caught and handled by the calling function.
    }
  }

  public async runGetMethod(methodName: any, address: any): Promise<any> {
    try {
      const accountState = await this.getAccount(address);

      // Check if accountState has the expected structure
      if (!accountState || !accountState.boc) {
        throw new Error('Invalid account state returned.');
      }

      const { message } = await this.tonClient.abi.encode_message({
        abi: {
          type: 'Contract',
          value: SampleWalletContract.abi,
        },
        address,
        call_set: {
          function_name: methodName,
          input: {},
        },
        signer: { type: 'None' },
      });

      const response = await this.tonClient.tvm.run_tvm({
        message,
        account: accountState.boc,
        abi: {
          type: 'Contract',
          value: SampleWalletContract.abi,
        },
      });

      // Check if response has the expected structure
      if (!response || !response.decoded || !response.decoded.output) {
        throw new Error('Unexpected response structure from run_tvm.');
      }

      return response.decoded.output;
    } catch (error) {
      console.error('Error in runGetMethod:', error);
      throw error; // Re-throw the error so that it can be caught and handled by the calling function.
    }
  }
}
