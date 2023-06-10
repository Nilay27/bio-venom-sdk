import React, { useState } from 'react';
import { createCredential, getPublicKey } from '../../../sdk/webauthn/index';
import { encode } from '../../../sdk/webauthn/base64url-arraybuffer';
import { BioVenomProvider } from "../../../sdk/BioVenomProvider"

const SignIn = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleConnectClick = () => {
    setShowSignIn(true);
    setShowInput(true);
  };

  const handleSignInClick = async () => {
    const storedCredentials = localStorage.getItem(username);

    if (storedCredentials) {
      console.log(`Credentials for ${username} already exist.`);
    } else {
      const publicKeyCredential = await createCredential(username);
      const publicKey = await getPublicKey(publicKeyCredential.response.attestationObject);
      console.log("username", username);
      const encodedId = encode(publicKeyCredential?.rawId);
      const venomInstance = new BioVenomProvider();
      setLoading(true);
      const walletAddress = await venomInstance.deployWalletContract(publicKey);
      setLoading(false);
      console.log("walletAddress returned from venomInstance", walletAddress);
      console.log("encodedId in signIn", encodedId);
      localStorage.setItem(username, JSON.stringify({ encodedId: encodedId, publicKey: publicKey, walletAddress: walletAddress }));
      localStorage.setItem("username", username);
    }
    onSignIn();
  };

  return (
    <div className="sign-in">
      {loading && (
        <div className="loading-modal">
          <div className="loading-spinner"></div>
          <h3>Deploying And Prefunding your Wallet...</h3>
        </div>
      )}
      {
        <div style={{ display: 'flex', gap: '10px' }}>
          {showSignIn ? (
            <button onClick={handleSignInClick}>Sign in with Touch ID</button>
          ) : (
            <button onClick={handleConnectClick}>Connect Via BioVenom</button>
          )}
          {
            showInput && (<input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter username"
              disabled={!showSignIn}
            />)
          }
        </div>
      }
    </div>
  );
}

export default SignIn;
