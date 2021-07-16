import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { AuthDrawer } from "./AuthDrawer";

export const ProfileAvatar = () => {
  const isAuthenticated = useMoralis();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip label="Click to update your USA Wallet profile.">
        <Avatar boxShadow="dark-lg" mr={2} mt={-2} onClick={onOpen} />
      </Tooltip>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {isAuthenticated ? "Update user profile." : "Please sign in."}
          </DrawerHeader>
          <DrawerBody>
            <AuthDrawer />
          </DrawerBody>
          <DrawerFooter>
            <Tooltip label="Cancel profile update.">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </Tooltip>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
