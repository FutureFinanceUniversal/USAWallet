import { Button, HStack, VStack, Input } from "@chakra-ui/react";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useState } from "react";

export const AuthDrawer = (props) => {
  console.log("AuthDrawer initializing...");
  const {
    authenticate,
    authError,
    isAuthenticated,
    isAuthenticating,
    login,
    signup,
    setUserData,
    user,
  } = useMoralis();

  const [userName, setUserName] = useState(
    user ? user.attributes.username : ""
  );
  const [email, setEmail] = useState(user ? user.attributes.email : "");
  const [password, setPassword] = useState("");

  const handleLogIn = () => {
    console.log("handleLogIn...");
    login(email, password === "" ? undefined : password, {
      usePost: true,
    });
  };

  const handleSignUp = () => {
    console.log("handleSignUp...");
    signup(userName, password, email, { usePost: true });
  };

  const handleSave = () => {
    console.log("setUserData...");
    setUserData({
      userName,
      email,
      password: password === "" ? undefined : password,
      usePost: true,
    });
  };

  return (
    <VStack
      spacing={6}
      borderWidth="5px"
      borderRadius="md"
      padding="30px"
      mt="10px"
      boxShadow="dark-lg"
    >
      {authError != null && (
        <Alert status="warning">
          <AlertIcon />
          <AlertDescription>{authError.message}</AlertDescription>
        </Alert>
      )}
      {isAuthenticated && (
        <Input
          placeholder="User Name *"
          type="text"
          variant="filled"
          value={userName}
          onChange={(event) => setUserName(event.currentTarget.value)}
          boxShadow="dark-lg"
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
        placeholder="Password *"
        type="password"
        variant="filled"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        boxShadow="dark-lg"
      />
      {!isAuthenticated ? (
        <>
          <HStack>
            <Button
              isLoading={isAuthenticating}
              onClick={handleSignUp}
              boxShadow="dark-lg"
            >
              Sign up
            </Button>
            <Button
              isLoading={isAuthenticating}
              onClick={handleLogIn}
              boxShadow="dark-lg"
            >
              Log in
            </Button>
          </HStack>
          <Button
            isLoading={isAuthenticating}
            onClick={authenticate({ usePost: true })}
            boxShadow="dark-lg"
          >
            Use MetaMask
          </Button>
        </>
      ) : (
        <Button
          isLoading={isAuthenticating}
          onClick={handleSave}
          boxShadow="dark-lg"
        >
          Update signature
        </Button>
      )}
    </VStack>
  );
};
