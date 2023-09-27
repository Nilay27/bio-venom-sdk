import { Box, Center, Text, Flex, useDisclosure, IconButton } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import Navbar from './components/Navbar';
import Main from './components/Main';
import { useState, useEffect } from 'react';
import { SDKContextProvider } from './context/SDKContext';
import { PARTNER_SITES } from './Constants';

function App() {
  const { isOpen: isconnectOpen, onOpen: onconnectOpen, onClose: onconnectClose } = useDisclosure();
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateUser = (updatedUser, updatedUsername) => {
    setUser(updatedUser);
    setUsername(updatedUsername);
    localStorage.setItem(updatedUsername, JSON.stringify(updatedUser));
  };
  const connectModal = {
    isOpen: isconnectOpen,
    onOpen: onconnectOpen,
    onClose: onconnectClose,
  };

  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', false);
  }

  // when the connect modal closes, check if the user is logged in and update the state
  useEffect(() => {
    if (!isconnectOpen) {
      const username = localStorage.getItem('username');
      const loggedIn = JSON.parse(localStorage.getItem('user'));
      console.log('loggedIn inside useEffect', loggedIn);
      if (username && loggedIn) {
        const allreadyUser = JSON.parse(localStorage.getItem(username));
        console.log('allreadyUser', allreadyUser);
        setUser(allreadyUser);
        setUsername(username);
      }
      setIsLoggedIn(loggedIn);
    }
  }, [isconnectOpen]);

  // useEffect to load user data from localStorage and save it to user
  useEffect(() => {
    const username = localStorage.getItem('username');
    const loggedIn = JSON.parse(localStorage.getItem('user'));
    console.log('username', username);
    console.log('loggedIn', loggedIn);
    if (username && loggedIn) {
      const allreadyUser = JSON.parse(localStorage.getItem(username));
      console.log('allreadyUser', allreadyUser);
      setUser(allreadyUser);
      setUsername(username);
      setIsLoggedIn(loggedIn);
    }
    // Extract the 'source' query parameter from the current URL
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    console.log('source', source);
    if (source && PARTNER_SITES.hasOwnProperty(source)) {
      // ... (rest of the logic remains the same)
      console.log('Valid source');
      let taskValue = localStorage.getItem('username');
      console.log('source', source);
      // Check if the task was performed
      let taskCompleted = taskValue ? true : false;
      console.log('URL', PARTNER_SITES[source]);
      // Redirect back to the respective partner site with the result
      window.location.href = `${PARTNER_SITES[source]}?taskCompleted=${taskCompleted}`;
    } else if (source) {
      console.log('Invalid source:', source);
    }
  }, []);

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
        {user.isPrefunded && user.isDeployed && isLoggedIn ? (
          <Flex flexDirection="column" alignItems="center">
            <Flex alignItems="center" mb={2}>
              <Text fontSize={{ base: '20px', sm: '24px' }} mr={2}>
                Welcome: {username}
              </Text>
              <IconButton
                icon={<CopyIcon fontSize="20px" color="white" />}
                onClick={() => {
                  navigator.clipboard.writeText(username);
                }}
                size="sm"
                bg="transparent"
                _hover={{ bg: 'gray.600', opacity: 0.8 }}
              />
            </Flex>
            <Flex alignItems="center">
              <Text fontSize={{ base: '20px', sm: '24px' }} mr={2}>
                Address: {user.walletAddress.slice(0, 5)}...{user.walletAddress.slice(-5)}
              </Text>
              <IconButton
                icon={<CopyIcon fontSize="20px" color="white" />}
                onClick={() => {
                  navigator.clipboard.writeText(user.walletAddress);
                }}
                size="sm"
                bg="transparent"
                _hover={{ bg: 'gray.600', opacity: 0.8 }}
              />
            </Flex>
          </Flex>
        ) : null}
        <Main connectModal={connectModal} updateUser={updateUser} />
      </Box>
    </SDKContextProvider>
  );
}

export default App;
