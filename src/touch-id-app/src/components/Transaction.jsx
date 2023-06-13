import React from 'react';
import {SampleWalletAbi} from "../abis/SampleWalletAbi"
import {StateContractAbi} from "../abis/StateContractAbi"
import {VenomWalletAbi} from "../abis/VenomWalletAbi"
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import { BioVenomProvider } from "bio-venom-sdk/lib/BioVenomProvider";
import TransactionPopover from "./popup/index"


const Transaction = ({ action, actionValue, handleTxReload }) => {
    const [username, setUsername] = React.useState('');
    const [encodedId, setEncodedId] = React.useState('');
    const [WalletContract, setWalletContract] = React.useState('');
    const [walletAddress, setWalletAddress] = React.useState('');
    const [publicKey, setPublicKey] = React.useState('');
    const [stateContract, setStateContract] = React.useState('');
    const [bioVenomInstance, setBioVenomInstance] = React.useState(new BioVenomProvider());
    const [showPopover, setShowPopover] = React.useState(false);
    const [amount, setAmount] = React.useState(0.1);
    const [toAddress, setToAddress] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [transactionInProgress, setTransactionInProgress] = React.useState(false);
    const [Provider, setProvider] = React.useState(new ProviderRpcClient({
      forceUseFallback: true,
      fallback: () =>
        EverscaleStandaloneClient.create({
          connection: {
            id: 1002, // network id
            group: "dev",
            type: 'jrpc',
            data: {
              endpoint: "https://jrpc-devnet.venom.foundation/rpc",
            },
          }
        }),
    }));




    const createEncodedPayload = async (newState = 0) => {
      const Provider = new ProviderRpcClient({
        forceUseFallback: true,
        fallback: () =>
          EverscaleStandaloneClient.create({
            connection: {
              id: 1002, // network id
              group: "dev",
              type: 'jrpc',
              data: {
                endpoint: "https://jrpc-devnet.venom.foundation/rpc",
              },
            },
            
          }),
      });
      if (Provider === null ) {
        setHtppProvider();
        setHtppProvider();
      }
      const stateContractAddressString = "0:26e36bfd887de7b8b4b8b21155bc073403b8ef264c8de2f72636166b846dc375"
      const StateContractAddress = new Address(stateContractAddressString)
      const StateContract = new Provider.Contract(StateContractAbi, StateContractAddress);
      setStateContract(StateContract);
      console.log("state contract address", StateContract.address.toString())
      const payload = await StateContract.methods.setState({_state: newState}).encodeInternal();
      return {payload, StateContract};
    }

    const handleWalletAddressClick = () => {
      window.open('https://devnet.venomscan.com/accounts/'+ walletAddress, '_blank');
    }

    const setHtppProvider = () =>{
      const Provider = new ProviderRpcClient({
        forceUseFallback: true,
        fallback: () =>
          EverscaleStandaloneClient.create({
            connection: {
              id: 1002, // network id
              group: "dev",
              type: 'jrpc',
              data: {
                endpoint: "https://jrpc-devnet.venom.foundation/rpc",
              },
            },
            
          }),
      });
      console.log("Provider", Provider)
    }

    const handleSignTransactionClick = async () => {
      let encodedPayload = '';
      let unsignedUserOp = '';
      if (Provider === null) {
        setHtppProvider();
        setHtppProvider();
      }
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
        const {payload, StateContract} = await createEncodedPayload(parseInt(actionValue));
        unsignedUserOp = await bioVenomInstance.createUnsignedUserOp(payload, parseInt(actionValue));
        const signedTVMCellUserOp = await bioVenomInstance.signTvmCellUserOp(unsignedUserOp, encodedId, publicKey)
        console.log("state contract address in signTransaction", StateContract.address.toString())
        const output = await bioVenomInstance.executeTransaction(StateContract.address, signedTVMCellUserOp,
        5000000);
        console.log("output", output)
      }
      setShowPopover(false);
    };

    const handleTransaction = () => {
      if (action === 'sendVenom') {
        setToAddress(actionValue);
        setMessage("Transfer Venom")
      } else if (action === 'changeState') {
        setAmount(0)
        setToAddress("0:26e36bfd887de7b8b4b8b21155bc073403b8ef264c8de2f72636166b846dc375")
        setMessage("Change State to " + actionValue)
      }
      setShowPopover(true);
    }

    const handleSignout = () => {
      localStorage.setItem('hasReloaded', 'false');
      window.location.reload();
    }

    const handleConfirm = async (result) => {
      if(result) {
        setShowPopover(false);
        setTransactionInProgress(true); // Start showing the loader
        await handleSignTransactionClick();
        setTransactionInProgress(false); // Stop showing the loader
      } else{
        setShowPopover(false);
      }
    }

    React.useEffect(() => {
      const username = localStorage.getItem('username');
      if (username && localStorage.getItem('hasReloaded') !== 'true') {
        handleTxReload()
        localStorage.setItem('hasReloaded', 'true');
        console.log("reloading")
        setTimeout(() => window.location.reload(), 500); // wait half a second before reload
        console.log("reloaded")
      }
      // if (username && localStorage.getItem('hasReloaded') === 'true'){
      //   localStorage.setItem('hasReloaded', 'false');
      // }
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
        setWalletContract(WalletContract);
    }, []);

    

  return (
    <div className="transaction">
      {walletAddress && 
      <button 
      onClick={handleWalletAddressClick}
      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
      >
      Wallet deployed: {walletAddress.substring(0,6)}...{walletAddress.substring(walletAddress.length - 3, walletAddress.length)}
    </button>}
      <button onClick={handleTransaction}>Sign Transaction</button>
      <button onClick={handleSignout}>Signout</button>
      {transactionInProgress && (
        <div className="loading-modal">
          <div className="loading-spinner"></div>
          <h3>Processing your txn, check wallet address for details once it's done</h3>
        </div>
      )}
      <div>
        {showPopover && (<TransactionPopover  from={walletAddress}
                        to={toAddress}
                        amount={amount}
                        message = {message}
                        onConfirm={handleConfirm}/>)}
      </div>
    </div>
  );
}

export default Transaction;
