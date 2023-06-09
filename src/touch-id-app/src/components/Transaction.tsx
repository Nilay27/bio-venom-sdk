import React from 'react';
import {getCredential, getRSAndXYCoordinates} from '../../../sdk/webauthn/index'
import { useState, useEffect } from 'react';
import {SampleWalletAbi} from "../../abis/SampleWalletAbi"
import {StateContractAbi} from "../../abis/StateContractAbi"
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import { BioVenomProvider } from '../../../sdk/BioVenomProvider';
/** State contract address on devnet: 
 * 0:26e36bfd887de7b8b4b8b21155bc073403b8ef264c8de2f72636166b846dc375
*/
const Transaction: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [encodedId, setEncodedId] = useState<string>('');
    const [Provider, setProvider] = useState<any>('');
    const [WalletContract, setWalletContract] = useState<any>('');
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [publicKey, setPublicKey] = useState<string>('');
    const [stateContract, setStateContract] = useState<any>('');
    const [bioVenomInstance, setBioVenomInstance] = useState<BioVenomProvider>(new BioVenomProvider());

  const createEncodedPayload = async (newState:number = 52) => {
    const stateContractAddressString = "0:26e36bfd887de7b8b4b8b21155bc073403b8ef264c8de2f72636166b846dc375"
    const StateContractAddress = new Address(stateContractAddressString)
    const StateContract = new Provider.Contract(StateContractAbi, StateContractAddress);
    setStateContract(StateContract);
    console.log("state contract address", StateContract.address.toString())
    const payload = await StateContract.methods.setState({_state: newState}).encodeInternal();
    return payload;
  }

  const handleSignTransactionClick = async () => {
    const WalletAddress = new Address(walletAddress)
    const WalletContract = new Provider.Contract(SampleWalletAbi, WalletAddress);
    console.log("walletAddress", WalletContract.address.toString())
    const encodedPayload = await createEncodedPayload();
    bioVenomInstance.setWalletContract(walletAddress)
    const unsignedUserOp = await bioVenomInstance.createUnsignedUserOp(encodedPayload)
    const signedTVMCellUserOp = await bioVenomInstance.signTvmCellUserOp(unsignedUserOp, encodedId, publicKey)
    console.log("state contract address in signTransaction", stateContract.address.toString())
    const output = await bioVenomInstance.executeTransaction(stateContract.address, signedTVMCellUserOp,
      5000000);
    console.log("output", output)
  };

  // useEffect to get the publicKeyCredential from localStorage and set it to state
    useEffect(() => {
        const username = localStorage.getItem("username");
        console.log("username", username);
        if(username) {
          setUsername(username);
          const {encodedId, publicKey, walletAddress} = JSON.parse(localStorage.getItem(username) || '{}');
          console.log('walletAddress from local storage:', walletAddress);
          console.log("publicKey", publicKey)
          setWalletAddress(walletAddress);
          setPublicKey(publicKey);
          if (encodedId !== null) {
            console.log("encodedId in txn", encodedId)
            setEncodedId(encodedId);
          }
        }
        
        const Provider = new ProviderRpcClient({
          forceUseFallback: true,
          fallback: () =>
            EverscaleStandaloneClient.create({
              connection: {
                id: 1002, // network id
                group: "venom_testnet",
                type: 'jrpc',
                data: {
                  endpoint: "https://jrpc-devnet.venom.foundation/rpc",
                },
              },
              initInput: '../../node_modules/nekoton-wasm/nekoton_wasm_bg.wasm',
            }),
        });
        console.log("Provider", Provider)
        setProvider(Provider);        
        setWalletContract(WalletContract);
    }, []);



  return (
    <div className="transaction">
      <button onClick={handleSignTransactionClick}>Sign Transaction</button>
    </div>
  );
}

export default Transaction;
