import React, { useState } from 'react';
import {createCredential, getPublicKey} from '../../../sdk/webauthn/index'
import { encode } from '../../../sdk/webauthn/base64url-arraybuffer';
import {BioVenomProvider} from "../../../sdk/BioVenomProvider"

interface SignInProps {
  onSignIn: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [username, setUsername] = useState<string>('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSignInClick =  async() => {
    const storedCredentials = localStorage.getItem(username);

    if (storedCredentials) {
      console.log(`Credentials for ${username} already exist.`);
      // you could parse the stored credentials and do something with them here
      // const { encodedId, publicKey } = JSON.parse(storedCredentials);
    } else {
      // logic to handle Touch ID sign in will go here
      const publicKeyCredential: any = await createCredential(username);
      const publicKey = await getPublicKey(publicKeyCredential.response.attestationObject)
      console.log("username", username);
      const encodedId = encode(publicKeyCredential?.rawId);
      const venomInstance = new BioVenomProvider();
      // deploy wallet contract and prefund it
      const walletAddress = await venomInstance.deployWalletContract(publicKey);
      console.log("walletAddress returned from venomInstance", walletAddress);
      console.log("encodedId in signIn", encodedId);
      // store the publicKeyCredential against the username in localStorage
      localStorage.setItem(username, JSON.stringify({encodedId:encodedId, publicKey:publicKey, walletAddress:walletAddress}));
      localStorage.setItem("username", username);
    }
    onSignIn();
  };

  return (
    <div className="sign-in">
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Enter username"
      />
      <button onClick={ handleSignInClick}>Sign in with Touch ID</button>
    </div>
  );
}

export default SignIn;
