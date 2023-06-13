import React, { useState } from 'react';
import SignIn from './components/SignIn';
import Transaction from './components/Transaction';
import ActionBox from './components/ActionBox'; // import the new component

import './App.css';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [action, setAction] = useState('');
  const [actionValue, setActionValue] = useState('');
  if (!localStorage.getItem('hasReloaded')) {
    localStorage.setItem('hasReloaded', 'false');
  }
  
  const transactionReload = () => {
    setIsSignedIn(true);
  }

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleAction = (action, value) => {
    setAction(action);
    setActionValue(value);
  };

  return (
    <div className="app">
      <h2 className='sdk-name'>BioVenomSdk Demo</h2>
      <h2 className='sdk-name'>Welcome to SetState DApp</h2>
      <ActionBox isSignedIn={isSignedIn} onAction={handleAction} />
      {!isSignedIn ? <SignIn onSignIn={handleSignIn} /> : <Transaction action={action} actionValue={actionValue} handleTxReload={transactionReload}/>}
    </div>
  );
}

export default App;
