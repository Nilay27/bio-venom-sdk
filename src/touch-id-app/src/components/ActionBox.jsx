import React, { useState } from 'react';

const ActionBox = ({ isSignedIn, onAction }) => {
  const [venomAddress, setVenomAddress] = useState('');
  const [newState, setNewState] = useState(null);

  const handleVenomAddressChange = (event) => {
    const value = event.target.value;
    setVenomAddress(value);
    if (value !== '') {
      setNewState(null);
    }
    onAction('sendVenom', value);
  };
  
  const handleNewStateChange = (event) => {
    const value = parseInt(event.target.value);
    setNewState(isNaN(value) ? null : value);
    if (!isNaN(value)) {
      setVenomAddress('');
    }
    onAction('changeState', event.target.value);
  };

  return (
    <div className="action-box">
      <div className="action-item">
        <label> <b>Send 0.1 Venom</b></label>
        <input type="text" placeholder="Enter Address" disabled={!isSignedIn || newState !== null} value={venomAddress} onChange={handleVenomAddressChange} />
      </div>
      <div className="action-item">
        <label><b>Change State</b></label>
        <input type="number" placeholder="Enter New State" disabled={!isSignedIn || venomAddress !== ''} value={newState || ''} onChange={handleNewStateChange} />
      </div>
    </div>
  );
}

export default ActionBox;
