import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export const TopNavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
        <Text> USA Wallet</Text>
      </Box>
      <Spacer />
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
      <Avatar boxShadow="dark-lg" />
    </Flex>
  );
};
