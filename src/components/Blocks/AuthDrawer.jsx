import { Button, Input, HStack, VStack } from "@chakra-ui/react";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import "../AuthDrawer.css";

export const AuthDrawer = (props) => {
  const {
    authenticate,
    isAuthenticating,
    authError,
    isAuthenticated,
    login,
    setUserData,
    signup,
    user,
  } = useMoralis();

  const [userName, setUserName] = useState(
    user ? user.attributes.username : ""
  );
  const [email, setEmail] = useState(user ? user.attributes.email : "");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    console.log("handleSignUp...");
    signup(userName ? userName : email, password, email, { usePost: true });
  };

  const handleLogIn = () => {
    login(email, password === "" ? undefined : password, {
      usePost: true,
    });
  };

  const handleAuthenticate = () => {
    authenticate({ usePost: true });
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

  const handlePasswordReset = () => {
    if (email === "") {
      alert("Please enter an e-mail, then retry 'Password reset'.");
    } else {
      // const appId = "CkGKKjw1WWWWNAo2GRMO1yPyjTrRx8YAIX4E8Q8q";
      // const serverUrl = "https://jlodflimpqon.moralis.io:2053/server";
      // Moralis.initialize(appId); // Application id from moralis.io
      // Moralis.serverURL = serverUrl; //Server url from moralis.io

      // Moralis.User
      //   .requestPasswordReset(email)
      //   .then(() => {
      //     // Password reset request was sent successfully
      alert("Password reset e-mail has been sent to " + email);
      //     })
      //     .catch((error) => {
      //       // Show the error message somewhere
      //       alert("Error: " + error.code + " " + error.message);
      //     });
      // }
    }
  };

  // const emailClassName = () => {
  //   if (isAuthenticated && !isAuthenticating) {
  //     if (user && user.attributes.emailVerified) {
  //       return "email verified";
  //     }
  //   }
  //   return "email unverified";
  // };

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
        className={isAuthenticated ? "email verified" : "email"}
        placeholder="E-mail *"
        type="email"
        variant="filled"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        boxShadow="dark-lg"
      />
      {user && user.attributes.emailVerified && (
        <Alert status="warning">
          <AlertIcon />
          Check your email for validation link.
        </Alert>
      )}
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
            <Button onClick={handleSignUp} boxShadow="dark-lg">
              Sign up
            </Button>
            <Button onClick={handleLogIn} boxShadow="dark-lg">
              Log in
            </Button>
          </HStack>
          <Button
            onClick={handlePasswordReset}
            boxShadow="dark-lg"
            disabled="true"
          >
            Password Reset
          </Button>
          <Button
            isLoading={isAuthenticating}
            onClick={handleAuthenticate}
            boxShadow="dark-lg"
          >
            Use MetaMask
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleSave} boxShadow="dark-lg">
            Update signature.
          </Button>
        </>
      )}
    </VStack>
  );
};
