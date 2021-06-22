import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { AuthDrawer } from "./AuthDrawer";

export const AuthButton = () => {
  const { isAuthenticated, logout } = useMoralis();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {isAuthenticated ? (
        <Button
          font-family="P22-Typewriter"
          boxShadow="dark-lg"
          mr={2}
          mt={-2}
          onClick={() => logout()}
        >
          Log Out
        </Button>
      ) : (
        <>
          <Button
            font-family="P22-Typewriter"
            boxShadow="dark-lg"
            mr={2}
            onClick={onOpen}
          >
            Log In
          </Button>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Please sign in.</DrawerHeader>

              <DrawerBody>
                <AuthDrawer closeDrawer={onClose} />
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
};
