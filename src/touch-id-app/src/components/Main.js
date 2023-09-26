import { Center, Button, VStack, Input, useDisclosure, useToast } from '@chakra-ui/react';
import ConnectModal from './modals/ConnectModal';
import TransactionModal from './modals/TransactionModal';
import { useEffect, useState, useContext } from 'react';
import { SDKContext } from '../context/SDKContext';
import { PREFUND_URL } from '../Constants';

function Main({ connectModal, updateUser }) {
  const sharedObject = useContext(SDKContext);
  const toast = useToast();
  const [username, setUsername] = useState('');
  const [encodedId, setEncodedId] = useState('');
  const [WalletContract, setWalletContract] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [bioVenomInstance, setBioVenomInstance] = useState(sharedObject.provider);
  const [amount, setAmount] = useState(null);
  const [toAddress, setToAddress] = useState(null);
  const [message, setMessage] = useState('Transfer Venom');
  const [httpProvider, setHttpProvider] = useState(null);
  const [txbutton, settxbutton] = useState(true);
  const [prefundStatus, setprefundStatus] = useState(false);
  const [isUser, setisUser] = useState(JSON.parse(localStorage.getItem('user')));
  const { isOpen: istransactOpen, onOpen: ontransactOpen, onClose: ontransactClose } = useDisclosure();
  const reactGA = sharedObject.analytics;

  const transactModal = {
    isOpen: istransactOpen,
    onOpen: ontransactOpen,
    onClose: ontransactClose,
    toAddress: toAddress,
    amount: amount,
    message: message,
    fromAddress: walletAddress,
    username: username,
    publicKey: publicKey,
    encodedId: encodedId,
  };

  const preFundAndDeployWallet = async () => {
    if (walletAddress == '' || prefundStatus == true) {
      settxbutton(false);
      return;
    }
    try {
      const bioVenomDeployerInstance = bioVenomInstance.getBioVenomDeployerInstance();
      console.log('wallet address to be prefunded', walletAddress);
      const isPrefunded = await bioVenomDeployerInstance.prefundDeployedWalletViaBackend(PREFUND_URL, walletAddress);
      console.log('isPrefunded', isPrefunded);
      setprefundStatus(isPrefunded);
      toast({
        title: 'Wallet Prefunded',
        description: 'Your wallet has been prefunded',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
      const deployedWalletAddress = await bioVenomInstance.deployWalletContract(publicKey);
      if (deployedWalletAddress !== walletAddress) {
        throw new Error('Deployed wallet address does not match the expected wallet address');
      }
      toast({
        title: 'Wallet Deployed',
        description: 'Your wallet has been deployed',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
      settxbutton(false);
      const user = JSON.parse(localStorage.getItem(username));
      user.isPrefunded = true;
      user.isDeployed = true;
      updateUser(user, username);
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

  // a function to check the amount entered and the wallet address entered, with erro handling to throw toast messages
  const checkInputs = () => {
    if (toAddress == null || toAddress == undefined || toAddress == '') {
      toast({
        title: 'Error occurred',
        description: 'Please enter wallet address',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 2000,
      });
    } else if (amount == null || amount == undefined || amount == '') {
      toast({
        title: 'Error occurred',
        description: 'Please enter amount',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 2000,
      });
    } else if (parseFloat(transactModal.amount) > 0.01) {
      toast({
        title: 'Error occurred',
        description: 'Max amount can be 0.01',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 2000,
      });
    } else {
      return true;
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    console.log('username', username);
    if (username) {
      setUsername(username);
      const { encodedId, publicKey, walletAddress, isPrefunded, isDeployed } = JSON.parse(
        localStorage.getItem(username) || '{}',
      );
      console.log('walletAddress from local storage:', walletAddress);
      console.log('publicKey', publicKey);
      console.log('Prefund Status', isPrefunded);
      if (isPrefunded == true) {
        settxbutton(false);
      }
      setWalletAddress(walletAddress);
      setPublicKey(publicKey);
      setprefundStatus(isPrefunded);
      if (encodedId !== null) {
        console.log('encodedId in txn', encodedId);
        setEncodedId(encodedId);
      }
    }
    setWalletContract(WalletContract);

    const Provider = bioVenomInstance.getProvider();
    setHttpProvider(Provider);
  }, [connectModal.isOpen, isUser, txbutton]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setisUser(JSON.parse(localStorage.getItem('user')));
    console.log(user);
    if (user) {
      preFundAndDeployWallet();
    }
  }, [walletAddress]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      settxbutton(true);
      setprefundStatus(true);
      setisUser(JSON.parse(localStorage.getItem('user')));
    }
    reactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

  return (
    <>
      <Center mb={'40px'}>
        <VStack
          bgColor={'#171717'}
          w={{ base: '320px', sm: '380px' }}
          p={'16px'}
          borderRadius={'24px'}
          spacing={'20px'}
          boxShadow={'0px 14px 133px 14px rgba(252, 114, 255, 0.25)'}
        >
          <Input
            value={toAddress}
            onChange={(e) => {
              setToAddress(e.target.value);
            }}
            placeholder="To Address"
            size={'lg'}
            bgColor={'black'}
            _placeholder={{ color: 'gray' }}
            border={'none'}
            borderRadius={'12px'}
          />
          <Input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            placeholder="Amount (max limit: 0.01)"
            type="number"
            size={'lg'}
            bgColor={'black'}
            _placeholder={{ color: 'gray' }}
            border={'none'}
            borderRadius={'12px'}
          />
          <Button
            size={'lg'}
            colorScheme={'blackAlpha'}
            bgColor={'black'}
            rounded={'full'}
            color={'white'}
            w={'full'}
            isDisabled={txbutton}
            isLoading={!prefundStatus}
            loadingText={'Prefunding Wallet'}
            onClick={() => {
              if (checkInputs()) {
                transactModal.onOpen();
              }
            }}
          >
            Sign Transactions
          </Button>
          {isUser == false ? (
            <Button
              size={'lg'}
              colorScheme={'pink'}
              bgColor={'#311C31'}
              rounded={'full'}
              color={'#FC72FF'}
              onClick={connectModal.onOpen}
              w={'full'}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              size={'lg'}
              colorScheme={'pink'}
              bgColor={'#311C31'}
              rounded={'full'}
              color={'#FC72FF'}
              onClick={() => {
                window.open('https://testnet.venomscan.com/accounts/' + walletAddress, '_blank');
              }}
              w={'full'}
            >
              Wallet Address: {walletAddress.substring(0, 6)}...
              {walletAddress.substring(walletAddress.length - 3, walletAddress.length)}
            </Button>
          )}
        </VStack>
      </Center>
      <ConnectModal connectModal={connectModal} setisUser={setisUser} />
      <TransactionModal transactModal={transactModal} />
    </>
  );
}

export default Main;
