import React from "react";
import "./AuthButton.css";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useColorMode,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { AuthDrawer } from "./AuthDrawer";

export const AuthButton = () => {
  const { isAuthenticated, logout } = useMoralis();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      {isAuthenticated ? (
        <Tooltip label="Log out of USA Wallet.">
          <Button
            fontFamily="P22-Typewriter"
            boxShadow="dark-lg"
            mr={2}
            mt={-2}
            onClick={() => logout()}
          >
            Log Out
          </Button>
        </Tooltip>
      ) : (
        <>
          <Tooltip label="Log into USA Wallet.">
            <Button
              fontFamily="P22-Typewriter"
              boxShadow="dark-lg"
              mr={2}
              mt={-2}
              onClick={onOpen}
            >
              Log In
            </Button>
          </Tooltip>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            className={`AuthDrawer ${
              colorMode === "light" ? "lightBG" : "darkBG"
            }`}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Please sign in.</DrawerHeader>

              <DrawerBody>
                <AuthDrawer closeDrawer={onClose} />
              </DrawerBody>

              <DrawerFooter>
                <Tooltip label="Cancel identity action.">
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                </Tooltip>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
};
