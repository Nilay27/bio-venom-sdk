import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';

import React, { useState, useEffect, useContext } from 'react';
import { createCredential, getPublicKey } from 'bio-venom-sdk/lib/webauthn/index';
import { encode } from 'bio-venom-sdk/lib/webauthn/base64url-arraybuffer';
import { SDKContext } from '../../context/SDKContext';

function ConnectModal({ connectModal, setisUser }) {
  const sharedObject = useContext(SDKContext);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [bioVenomInstance, setBioVenomInstance] = useState(sharedObject.provider);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const toast = useToast();
  const reactGA = sharedObject.analytics;

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername !== undefined) {
      setUsername(storedUsername);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignInClick = async () => {
    const storedCredentials = localStorage.getItem(username);
    if (storedCredentials) {
      console.log(`Credentials for ${username} already exist.`);
      localStorage.setItem('username', username);
      localStorage.setItem('user', true);
    } else {
      try {
        console.log('checking if username is available');
        await bioVenomInstance.checkUsername(username);
        // TODO: abstract away registration logic to BioVenomProvider
        let publicKey;
        let publicKeyCredential;
        try {
          publicKeyCredential = await createCredential(username);
          publicKey = await getPublicKey(publicKeyCredential.response.attestationObject);
        } catch (credentialError) {
          toast({
            title: 'Browser Not Supported',
            description: 'Please open the app in a supported browser such as Chrome, Safari, Firefox etc.',
            status: 'error',
            duration: 10000,
            isClosable: true,
            position: 'top',
          });
          connectModal.onClose(true);
          return;
        }

        console.log('username', username);
        const encodedId = encode(publicKeyCredential?.rawId);
        setLoading(true);
        const walletAddress = await bioVenomInstance.preCalculateAddress(publicKey);
        toast({
          title: 'Precalculated Wallet Address',
          // show first 5 and last 5 chars separated by ...
          description: `${walletAddress.substring(0, 5)}...${walletAddress.substring(walletAddress.length - 5)}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        setLoading(false);
        console.log('walletAddress returned from bioVenomInstance', walletAddress);
        console.log('encodedId in signIn', encodedId);
        localStorage.setItem(
          username,
          JSON.stringify({
            encodedId: encodedId,
            publicKey: publicKey,
            walletAddress: walletAddress,
            isPrefunded: false,
            isDeployed: false,
          }),
        );
        localStorage.setItem('username', username);
        localStorage.setItem('user', true);
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        return;
      }
    }
    // onSignIn();
    setisUser(true);
    connectModal.onClose(true);
  };

  return (
    <Modal isOpen={connectModal.isOpen} onClose={connectModal.onClose} isCentered size={'2xl'}>
      <ModalOverlay />
      <ModalContent
        bgColor={'#171717'}
        borderRadius={'32px'}
        boxShadow={'0px 4px 84px 0px rgba(252, 114, 255, 0.38)'}
        p={'16px'}
      >
        <ModalHeader>
          <Text color={'white'} fontSize={{ base: '24px', sm: '40px' }} fontWeight={'600'} lineHeight={'21.6px'}>
            Connect your wallet
          </Text>
        </ModalHeader>
        <ModalBody mt={'24px'}>
          <Input
            placeholder={'username'}
            borderRadius={'24px'}
            border={'none'}
            size={'lg'}
            color={'#FC72FF'}
            bg={'#0D0D0D'}
            _placeholder={{ color: '#FC72FF' }}
            value={username}
            onChange={handleUsernameChange}
          />
        </ModalBody>
        <ModalFooter mt={'32px'}>
          <Button
            isLoading={loading}
            loadingText={'Creating Wallet'}
            rounded={'full'}
            colorScheme={'pink'}
            bgColor={'#FC72FF'}
            color={'#311C31'}
            onClick={handleSignInClick}
          >
            Sign in using Touch ID
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConnectModal;
