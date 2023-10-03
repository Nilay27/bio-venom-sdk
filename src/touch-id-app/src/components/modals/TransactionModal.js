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
  Box,
  Text,
  Divider,
  Center,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { SDKContext } from '../../context/SDKContext';
import { SampleWalletAbi } from '../../abis/SampleWalletAbi';
import { VenomWalletAbi } from '../../abis/VenomWalletAbi';
import { Address } from 'everscale-inpage-provider';

function TransactionModal({ transactModal }) {
  const toast = useToast();
  const sharedObject = useContext(SDKContext);
  const [username, setUsername] = useState('');
  const [encodedId, setEncodedId] = useState('');
  const [WalletContract, setWalletContract] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [bioVenomInstance, setBioVenomInstance] = useState(sharedObject.provider);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [httpProvider, setHttpProvider] = useState(null);
  const reactGA = sharedObject.analytics;

  useEffect(() => {
    const username = localStorage.getItem('username');

    console.log('username', username);
    if (username) {
      setUsername(username);
      const { encodedId, publicKey, walletAddress } = JSON.parse(localStorage.getItem(username) || '{}');
      console.log('walletAddress from local storage:', walletAddress);
      console.log('publicKey', publicKey);
      setWalletAddress(walletAddress);
      setPublicKey(publicKey);
      if (encodedId !== null) {
        console.log('encodedId in txn', encodedId);
        setEncodedId(encodedId);
      }
    }
    setWalletContract(WalletContract);

    const Provider = bioVenomInstance.getProvider();
    setHttpProvider(Provider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactModal.isOpen]);

  const finalVenom = (amount) => {
    const fval = parseFloat(amount) + 0.001;
    return fval;
  };

  const handleSignTransactionClick = async () => {
    let encodedPayload = '';
    let unsignedUserOp = '';
    try {
      if (httpProvider === null) {
        throw new Error('httpProvider is null');
      }
      const WalletAddress = new Address(walletAddress);
      const WalletContract = new httpProvider.Contract(SampleWalletAbi, WalletAddress);
      bioVenomInstance.setWalletContract(walletAddress);
      console.log('walletAddress', WalletContract.address.toString());
      const venomWalletAdd = new Address(transactModal.toAddress);
      const venomWalletContract = new httpProvider.Contract(VenomWalletAbi, venomWalletAdd);
      unsignedUserOp = await bioVenomInstance.createUnsignedUserOp(encodedPayload);
      const signedTVMCellUserOp = await bioVenomInstance.signTvmCellUserOp(unsignedUserOp, encodedId, publicKey);
      // if transactionmodal.amount is not filled or if it is greater that 0.01, then throw error else multiply it by 10**9
      if (transactModal.amount === null || transactModal.amount === undefined || transactModal.amount === '') {
        throw new Error('Please enter amount');
      } else if (parseFloat(transactModal.amount) > 0.01) {
        throw new Error('Amount should be less than 0.01');
      } else {
        const transferAmount = parseFloat(transactModal.amount) * 10 ** 9;
        const output = await bioVenomInstance.executeTransaction(
          venomWalletContract.address,
          signedTVMCellUserOp,
          transferAmount,
        );
        console.log('output', output);
        toast({
          title: `Transaction successful, click the Wallet Address for details`,
          status: 'success',
          isClosable: true,
          position: 'top',
          duration: 10000,
        });
        // Record the transaction completion to GA4
        reactGA.event({
          category: 'Transaction', // Optional: Organizes events in GA dashboard
          action: 'Completed', // Required: Describes the event action
          label: 'Transaction_Success', // Optional: Provides additional information
          value: transferAmount, // Optional: You can track the transferred amount if desired
        });
      }
    } catch (error) {
      toast({
        title: 'Error occurred',
        description: error.message,
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
    }
  };

  const signTransaction = async () => {
    setTransactionInProgress(true); // Start showing the loader
    await handleSignTransactionClick();
    setTransactionInProgress(false); // Stop showing the loader
    transactModal.onClose(true);
  };

  return (
    <Modal isOpen={transactModal.isOpen} onClose={transactModal.onClose} isCentered size={'xl'}>
      <ModalOverlay />
      <ModalContent
        bgColor={'#171717'}
        borderRadius={'32px'}
        boxShadow={'0px 4px 84px 0px rgba(252, 114, 255, 0.38)'}
        p={'16px'}
      >
        <ModalHeader>
          <Text color={'white'} fontSize={{ base: '24px', sm: '40px' }} fontWeight={'600'} lineHeight={'21.6px'}>
            Transaction Summary
          </Text>
        </ModalHeader>
        <ModalBody>
          <Box borderRadius={'24px'} bgColor={'#0D0D0D'} py={'16px'} px={'31px'} my={'24px'}>
            <Text fontSize={'20px'} fontWeight={'400'} lineHeight={'21.6px'} color={'#FC72FF'} fontFamily={'monospace'}>
              from: {transactModal.fromAddress}
            </Text>
          </Box>
          <Box borderRadius={'24px'} bgColor={'#0D0D0D'} py={'16px'} px={'31px'} mb={'34px'}>
            <Text fontSize={'20px'} fontWeight={'400'} lineHeight={'21.6px'} color={'#FC72FF'} fontFamily={'monospace'}>
              to: {transactModal.toAddress}
            </Text>
          </Box>
          <Box ml={'10px'}>
            <Text fontSize={'20px'} fontWeight={'400'} lineHeight={'21.6px'} color={'#FC72FF'} fontFamily={'monospace'}>
              message
            </Text>
            <Text fontSize={'24px'} fontWeight={'400'} lineHeight={'21.6px'} color={'white'} mt={'12px'}>
              {transactModal.message}
            </Text>
          </Box>
          <Box ml={'10px'} my={'24px'}>
            <Text fontSize={'20px'} fontWeight={'400'} lineHeight={'21.6px'} color={'#FC72FF'} fontFamily={'monospace'}>
              gas fee
            </Text>
            <Text fontSize={'24px'} fontWeight={'400'} lineHeight={'21.6px'} color={'white'} mt={'12px'}>
              0.001 Venom
            </Text>
          </Box>
          <Box ml={'10px'}>
            <Text fontSize={'20px'} fontWeight={'400'} lineHeight={'21.6px'} color={'#FC72FF'} fontFamily={'monospace'}>
              total (including gas fee)
            </Text>
            <Text fontSize={'24px'} fontWeight={'400'} lineHeight={'21.6px'} color={'white'} mt={'12px'}>
              {finalVenom(transactModal.amount)} Venom
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter mt={'20px'}>
          <Button
            rounded={'full'}
            colorScheme={'pink'}
            bgColor={'#FC72FF'}
            color={'#311C31'}
            mr={'20px'}
            w={'136px'}
            onClick={signTransaction}
            isLoading={transactionInProgress}
            loadingText={'Processing'}
          >
            Accept
          </Button>
          <Button
            rounded={'full'}
            colorScheme={'pink'}
            bgColor={'#311C31'}
            color={'#FC72FF'}
            w={'136px'}
            onClick={transactModal.onClose}
          >
            Reject
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TransactionModal;
