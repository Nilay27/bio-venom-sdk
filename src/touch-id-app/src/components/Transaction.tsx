import React from 'react';
import {getCredential, getSignature, getSignatureAndFinalMessageToBeSigned} from '../../../sdk/webauthn/index'
import { useState, useEffect } from 'react';
// import {Provider} from '../../../sdk/Provider'
import { Address, ProviderRpcClient, TvmException } from 'everscale-inpage-provider';
import {SampleAbi} from "../../abis/SampleAbi"
import { EverscaleStandaloneClient } from 'everscale-standalone-client';


const Transaction: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [encodedId, setEncodedId] = useState<string>('');
    const [BioVenomProvider, setBioVenomProvider] = useState<any>('');
    const [EllipticContract, setEllipticContract] = useState<any>('');

  const handleSignTransactionClick = async () => {
    const credential = await getCredential(encodedId, username);
    console.log("credential", credential)
    const signature = await getSignature(credential);
    console.log("signature", signature)
    const {message, r, s} = await getSignatureAndFinalMessageToBeSigned(credential);
    console.log("message", message)
    console.log("r", r)
    console.log("s", s)
    // const output = await EllipticContract.methods.setState({_state: 12}).sendExternal({withoutSignature: true})
    // console.log("output", output)
    // const output2 = await EllipticContract.methods.getDetails({}).call()
    // console.log("output2", output2)
  };

  // useEffect to get the publicKeyCredential from localStorage and set it to state
    useEffect(() => {
        const username = localStorage.getItem("username");
        console.log("username", username);
        if(username) {
          setUsername(username);
          const {encodedId, publicKey} = JSON.parse(localStorage.getItem(username) || '{}');
          console.log("publicKey", publicKey)
          // const actualId= JSON.parse(encodedId || '{}');
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

        const ellipticAddress = new Address("0:7614152f2a4c61fc0c53bfc82906d61e33d585bb3208d3229d8580d4fb289ba1")
        const EllipticContract = new BioVenomProvider.Contract(SampleAbi, ellipticAddress);
        console.log("EllipticContract", EllipticContract)
        setEllipticContract(EllipticContract);
    }, []);



  return (
    <div className="transaction">
      <button onClick={handleSignTransactionClick}>Sign Transaction</button>
    </div>
  );
}

export default Transaction;
