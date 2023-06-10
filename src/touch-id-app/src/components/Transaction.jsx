import React from 'react';
import {getCredential, getRSAndXYCoordinates} from '../../../sdk/webauthn/index'
import {SampleWalletAbi} from "../../abis/SampleWalletAbi"
import {StateContractAbi} from "../../abis/StateContractAbi"
import {VenomWalletAbi} from "../../abis/VenomWalletAbi"
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import { BioVenomProvider } from '../../../sdk/BioVenomProvider';

const Transaction = ({ action, actionValue }) => {
    const [username, setUsername] = React.useState('');
    const [encodedId, setEncodedId] = React.useState('');
    const [Provider, setProvider] = React.useState('');
    const [WalletContract, setWalletContract] = React.useState('');
    const [walletAddress, setWalletAddress] = React.useState('');
    const [publicKey, setPublicKey] = React.useState('');
    const [stateContract, setStateContract] = React.useState('');
    const [bioVenomInstance, setBioVenomInstance] = React.useState(new BioVenomProvider());


    const createEncodedPayload = async (newState = 0) => {
      const stateContractAddressString = "0:26e36bfd887de7b8b4b8b21155bc073403b8ef264c8de2f72636166b846dc375"
      const StateContractAddress = new Address(stateContractAddressString)
      const StateContract = new Provider.Contract(StateContractAbi, StateContractAddress);
      setStateContract(StateContract);
      console.log("state contract address", StateContract.address.toString())
      const payload = await StateContract.methods.setState({_state: newState}).encodeInternal();
      return payload;
    }

    const handleSignTransactionClick = async () => {
        let encodedPayload = '';
        let unsignedUserOp = '';
        const WalletAddress = new Address(walletAddress)
        const WalletContract = new Provider.Contract(SampleWalletAbi, WalletAddress);
        bioVenomInstance.setWalletContract(walletAddress);

        console.log("walletAddress", WalletContract.address.toString())
        if (action === 'sendVenom') {
        // call function to send venom with actionValue
        const venomWalletAdd = new Address(actionValue);
        const venomWalletContract = new Provider.Contract(VenomWalletAbi, venomWalletAdd);
        unsignedUserOp = await bioVenomInstance.createUnsignedUserOp(encodedPayload);
        const signedTVMCellUserOp = await bioVenomInstance.signTvmCellUserOp(unsignedUserOp, encodedId, publicKey)
        const output = await bioVenomInstance.executeTransaction(venomWalletContract.address, signedTVMCellUserOp,
            100000000);
        console.log("output", output)
        } else if (action === 'changeState') {
        // call function to change state with actionValue
        encodedPayload = await createEncodedPayload(parseInt(actionValue));
        unsignedUserOp = await bioVenomInstance.createUnsignedUserOp(encodedPayload, parseInt(actionValue));
        const signedTVMCellUserOp = await bioVenomInstance.signTvmCellUserOp(unsignedUserOp, encodedId, publicKey)
        console.log("state contract address in signTransaction", stateContract.address.toString())
        const output = await bioVenomInstance.executeTransaction(stateContract.address, signedTVMCellUserOp,
        5000000);
        console.log("output", output)
        }
    };

    React.useEffect(() => {
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
      {walletAddress && <p>Wallet Address: {walletAddress}</p>}
      <button onClick={handleSignTransactionClick}>Sign Transaction</button>
    </div>
  );
}

export default Transaction;
