import { Box, Button, HStack, Image, Spacer } from '@chakra-ui/react';
import ConnectModal from './modals/ConnectModal';
import source from '../images/BioVenom_b_w.png';
import { useEffect, useState } from 'react';

function Navbar({ connectModal }) {
  const [isUser, setIsUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    setIsUser(JSON.parse(localStorage.getItem('user')));
  }, [JSON.parse(localStorage.getItem('user'))]);

  const handleSignOut = () => {
    localStorage.setItem('user', false);
    window.location.reload();
  };

  return (
    <>
      <Box p={'24px'}>
        <HStack>
          <Image
            src={source}
            w={{ base: '50px', sm: '100px' }}
            h={{ base: '50px', sm: '100px' }}
            borderRadius={'full'}
          />
          <Spacer />
          {!isUser ? (
            <Button
              size={{ base: 'md', sm: 'lg' }}
              colorScheme={'pink'}
              bgColor={'#311C31'}
              rounded={'full'}
              color={'#FC72FF'}
              onClick={connectModal.onOpen}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              size={{ base: 'md', sm: 'lg' }}
              colorScheme={'pink'}
              bgColor={'#311C31'}
              rounded={'full'}
              color={'#FC72FF'}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          )}
        </HStack>
      </Box>
      <ConnectModal connectModal={connectModal} />
    </>
  );
}

export default Navbar;
