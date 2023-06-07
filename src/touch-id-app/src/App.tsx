import React, { useState } from 'react';
import SignIn from './components/SignIn';
import Transaction from './components/Transaction';
import './App.css';

const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  return (
    <div className="app">
      <h2>This app allows you to Sign in to Venom Network and create a wallet just using your Touch ID.</h2>
      {!isSignedIn ? <SignIn onSignIn={handleSignIn} /> : <Transaction />}
    </div>
  );
}

export default App;
