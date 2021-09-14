import {
  Avatar,
  Button,
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  IconButton,
  Image,
  Input,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useMoralis } from "react-moralis";

export const TopNavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthenticated, logout } = useMoralis();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      className="HeaderOuterFlex"
      mt="10vh"
      ml="10vw"
      mr="10vw"
      width="100vw"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Image />
        <Text>USA Wallet</Text>
      </Box>
      <Spacer />
      <Box>
        <Button boxShadow="dark-lg" mr={2}>
          Expert Mode
        </Button>
        <IconButton
          mr={2}
          aria-label="Toggle Darkmode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          boxShadow="dark-lg"
          onClick={toggleColorMode}
        />
        {isAuthenticated ? (
          <Button boxShadow="dark-lg" mr={2} onClick={() => logout()}>
            Log Out
          </Button>
        ) : (
          <Container>
            <Button
              colorScheme="teal"
              mr={2}
              boxShadow="dark-lg"
              onClick={onOpen}
            >
              Log In
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              //finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create your account</DrawerHeader>

                <DrawerBody>
                  <Input placeholder="Type here..." />
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue">Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Container>
        )}
        ;
        <Avatar boxShadow="dark-lg" />
      </Box>
    </Flex>
  );
};
