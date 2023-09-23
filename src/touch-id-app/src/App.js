import { Box, Center, Text, useDisclosure } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import { useState, useEffect } from 'react';
import { SDKContextProvider } from './context/SDKContext';

function App() {
  const { isOpen: isconnectOpen, onOpen: onconnectOpen, onClose: onconnectClose } = useDisclosure();
  const connectModal = {
    isOpen: isconnectOpen,
    onOpen: onconnectOpen,
    onClose: onconnectClose,
  };

  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', false);
  }

  return (
    <SDKContextProvider>
      <Box w={'100%'} h={'100vh'} bg={'#131313'} color={'white'}>
        <Navbar connectModal={connectModal} />
        <Center>
          <Text fontSize={{ base: '36px', sm: '72px' }}>BioVenomSDK</Text>
        </Center>
        <Center mb={'80px'} mt={{ base: '16px', sm: '12px' }}>
          <Text
            fontSize={{ base: '24px', sm: '40px' }}
            fontWeight={'400'}
            textAlign={'center'}
            w={{ base: '320px', sm: '777px' }}
          >
            Your device is your Hardware-Wallet: Simple, Secure and Streamlined
          </Text>
        </Center>
        <Main connectModal={connectModal} />
      </Box>
    </SDKContextProvider>
  );
}

export default App;
