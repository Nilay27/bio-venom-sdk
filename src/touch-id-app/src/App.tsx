import React, { useState } from 'react';
import SignIn from './components/SignIn';
import Transaction from './components/Transaction';
import ActionBox from './components/ActionBox'; // import the new component

import './App.css';

const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [action, setAction] = useState<string>('');
  const [actionValue, setActionValue] = useState<string>('');

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleAction = (action: string, value: string) => {
    setAction(action);
    setActionValue(value);
  };


  return (
    <div className="app">
      <h2 className='sdk-name'>BioVenomSdk Demo</h2>
      <h2 className= 'sdk-name'>Welcome to SetState DApp</h2>
      <ActionBox isSignedIn={isSignedIn} onAction={handleAction} />
      {!isSignedIn ? <SignIn onSignIn={handleSignIn} /> : <Transaction action={action} actionValue={actionValue} />}
    </div>
  );
}

export default App;
