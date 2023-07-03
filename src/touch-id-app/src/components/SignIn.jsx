import React, { useState, useEffect, useContext } from 'react';
import { createCredential, getPublicKey } from 'bio-venom-sdk/lib/webauthn/index';
import { encode } from 'bio-venom-sdk/lib/webauthn/base64url-arraybuffer';
import { SDKContext } from '../context/SDKContext';

// TODO: Inject the provider from the  context
// NOTE: We only precalculate the address here and then store it in the local storage
// we can then proceed to the  transaction page.
const SignIn = ({ onSignIn }) => {
  const sharedObject = useContext(SDKContext);
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

  // // This function could be used to auto sign in
  // const autoSignIn = async (storedUsername) => {
  //   const storedCredentials = localStorage.getItem(storedUsername);
    
  //   if (storedCredentials) {
  //     console.log(`Credentials for ${storedUsername} already exist.`);
  //     onSignIn(storedUsername);
  //   }
  // };

  useEffect(() => {
    const hasReloaded = localStorage.getItem('hasReloaded');
    const storedUsername = localStorage.getItem('username');
    if(hasReloaded === "true") {
      setUsername(storedUsername);
      onSignIn();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleSignInClick = async () => {
    const storedCredentials = localStorage.getItem(username);

    if (storedCredentials) {
      console.log(`Credentials for ${username} already exist.`);
    } else {
      // TODO: abstract away registration logic to BioVenomProvider
      const publicKeyCredential = await createCredential(username);
      const publicKey = await getPublicKey(publicKeyCredential.response.attestationObject);
      console.log("username", username);
      const encodedId = encode(publicKeyCredential?.rawId);
      const venomInstance = sharedObject.provider;
      setLoading(true);
      const walletAddress = await venomInstance.preCalculateAddress(publicKey);
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
          <h3>Calculating your wallet Address</h3>
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
