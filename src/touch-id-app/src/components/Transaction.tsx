import React from 'react';
import {getCredential, getRSAndXYCoordinates} from '../../../sdk/webauthn/index'
import { useState, useEffect } from 'react';
import {SampleWalletAbi} from "../../abis/SampleWalletAbi"
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { EverscaleStandaloneClient } from 'everscale-standalone-client';

const Transaction: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [encodedId, setEncodedId] = useState<string>('');
    const [BioVenomProvider, setBioVenomProvider] = useState<any>('');
    const [WalletContract, setWalletContract] = useState<any>('');

  const handleSignTransactionClick = async () => {
    const credential = await getCredential(encodedId, username);
    console.log("credential", credential)
    const publicKey = JSON.parse(localStorage.getItem(username) || '{}').publicKey;
    const {rs, x1, y1, x2, y2} = await getRSAndXYCoordinates(credential, publicKey);
    console.log("rs", rs)
    console.log("x1", x1)
    console.log("y1", y1)
    console.log("x2", x2)
    console.log("y2", y2)
    const output = await WalletContract.methods.validateSignature({rs:rs, x1:x1, y1:y1, x2:x2, y2:y2}).sendExternal({withoutSignature: true})
    console.log("output", output)
  };

  // useEffect to get the publicKeyCredential from localStorage and set it to state
    useEffect(() => {
        const username = localStorage.getItem("username");
        console.log("username", username);
        if(username) {
          setUsername(username);
          const {encodedId, publicKey} = JSON.parse(localStorage.getItem(username) || '{}');
          console.log("publicKey", publicKey)
          if (encodedId !== null) {
            console.log("encodedId in txn", encodedId)
            setEncodedId(encodedId);
          }
        }
        const BioVenomProvider = new ProviderRpcClient({
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
        console.log("BioVenomProvider", BioVenomProvider)
        setBioVenomProvider(BioVenomProvider);
        setBioVenomProvider(BioVenomProvider);
        const walletAddress = new Address("0:119cc0b53e20dcef8819c541b0178e6db69227f989a32ad8525d06be6279562c")
        const WalletContract = new BioVenomProvider.Contract(SampleWalletAbi, walletAddress);
        console.log("walletAddress", WalletContract.address.toString())
        setWalletContract(WalletContract);
    }, []);



  return (
    <div className="transaction">
      <button onClick={handleSignTransactionClick}>Sign Transaction</button>
    </div>
  );
}

export default Transaction;
