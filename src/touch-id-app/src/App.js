import { Box, Center, Text, Flex, useDisclosure, IconButton } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import Navbar from './components/Navbar';
import Main from './components/Main';
import { useState, useEffect } from 'react';
import { SDKContextProvider } from './context/SDKContext';

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
    console.log('document referrer', document.referrer);
    if (document.referrer.includes('bivenomsdk.com')) {
      // Read values from localStorage
      let taskValue = localStorage.getItem('username');
      console.log('taskValue', taskValue);
      console.log("document.referrer",document.referrer)
      // Check if the task was performed
      let taskCompleted = taskValue === 'true'; // Replace 'expectedValue' with the value you expect

      // Redirect back to venomart.io with the result
      // window.location.href = `https://venomart.io/?taskCompleted=${taskCompleted}`;
      console.log('Valid referrer');
      console.log("href",`https://bivenomsdk.com/?taskCompleted=${taskCompleted}`)
    } else if (document.referrer) {
      // If the referrer is not venomart.io, handle accordingly
      console.log('Invalid referrer');
      // You can redirect the user to the homepage or display an error message
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
        <Main connectModal={connectModal} updateUser={updateUser} />
        {user.isPrefunded && user.isDeployed && isLoggedIn ? (
          <Flex flexDirection="column" alignItems="center">
            <Flex alignItems="center" mb={2}>
              <Text fontSize={{ base: '20px', sm: '24px' }} mr={2}>
                Username: {username}
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
      </Box>
    </SDKContextProvider>
  );
}

export default App;
