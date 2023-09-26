import { BioVenomProvider } from 'bio-venom-sdk';
import React, { createContext, useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
ReactGA.initialize('G-Z0VD0F0MKE');
const SDKContext = createContext();

const SDKContextProvider = ({ children }) => {
  const [sharedObject] = useState({
    // Your shared object properties and methods
    provider: new BioVenomProvider(),
    analytics: ReactGA,
  });

  return <SDKContext.Provider value={sharedObject}>{children}</SDKContext.Provider>;
};

export { SDKContext, SDKContextProvider };
