import { BioVenomProvider } from 'bio-venom-sdk';
import React, { createContext, useState } from 'react';

const SDKContext = createContext();

const SDKContextProvider = ({ children }) => {
  const [sharedObject] = useState({
    // Your shared object properties and methods
    provider: new BioVenomProvider(),
  });

  return (
    <SDKContext.Provider value={sharedObject}>
      {children}
    </SDKContext.Provider>
  );
};

export { SDKContext, SDKContextProvider };
