import { Button, HStack, VStack, Input } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import { ErrorBox } from "../Support/Error";

export const AuthDrawer = () => {
  const { authenticate, authError, isAuthenticating, login, signup } =
    useMoralis();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <VStack
      spacing={6}
      borderWidth="5px"
      borderRadius="md"
      padding="30px"
      mt="10px"
      boxShadow="dark-lg"
    >
      {authError != null ?? (
        <ErrorBox
          title="Authentication has failed."
          message={authError.message}
        />
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
          boxShadow="dark-lg"
        >
          Sign up
        </Button>
        <Button onClick={() => login(email, password)} boxShadow="dark-lg">
          LogIn
        </Button>
      </HStack>
      <Button
        isLoading={isAuthenticating}
        onClick={() => authenticate()}
        boxShadow="dark-lg"
      >
        Use MetaMask
      </Button>
    </VStack>
  );
};
