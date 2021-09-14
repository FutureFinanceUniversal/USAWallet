import {
  Button,
  Input,
  IconButton,
  Heading,
  HStack,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import { ErrorBox } from "../Support/ErrorPopup";

export const Auth = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { authenticate, authError, isAuthenticating, login, signup } =
    useMoralis();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const lightModeBG = "linear(to-br,blue.400,red.300,white,red.300,white)";
  const darkModeBG = "linear(to-br,blue.400,red.900,red.300,red.900,white)";

  return (
    <VStack
      spacing={6}
      borderWidth="5px"
      borderRadius="md"
      padding="30px"
      mt="10px"
      boxShadow="dark-lg"
    >
      {authError ? (
        <ErrorBox
          title="Authentication has failed."
          message={authError.message}
        />
      ) : (
        <Heading mb="5px">Sign in please.</Heading>
      )}
      <Input
        placeholder="Email"
        type="email"
        variant="filled"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        boxShadow="dark-lg"
      />
      <Input
        placeholder="Password"
        type="password"
        variant="filled"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        boxShadow="dark-lg"
      />
      <HStack>
        <Button
          onClick={() => signup(email, password, email)}
          bgGradient={colorMode === "light" ? lightModeBG : darkModeBG}
          boxShadow="dark-lg"
        >
          Sign up
        </Button>
        <Button
          onClick={() => login(email, password)}
          bgGradient={colorMode === "light" ? lightModeBG : darkModeBG}
          boxShadow="dark-lg"
        >
          LogIn
        </Button>
        <Button
          isLoading={isAuthenticating}
          onClick={() => authenticate()}
          bgGradient={colorMode === "light" ? lightModeBG : darkModeBG}
          boxShadow="dark-lg"
        >
          Authenticate via Wallet
        </Button>
        <IconButton
          aria-label="Toggle Darkmode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          boxShadow="dark-lg"
          onClick={toggleColorMode}
        />
      </HStack>
    </VStack>
  );
};
