import { Button, Input, HStack, Tooltip, VStack } from "@chakra-ui/react";
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

  console.groupCollapsed("AuthDrawer");

  const [userName, setUserName] = useState(
    user ? user.attributes.username : ""
  );
  const [email, setEmail] = useState(user ? user.attributes.email : "");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
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
    setUserData({
      userName,
      email,
      password: password === "" ? undefined : password,
      usePost: true,
    });
  };

  const handlePasswordReset = () => {
    console.groupCollapsed("handlePasswordReset");
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
    console.groupEnd();
  };

  // const emailClassName = () => {
  //   if (isAuthenticated && !isAuthenticating) {
  //     if (user && user.attributes.emailVerified) {
  //       return "email verified";
  //     }
  //   }
  //   return "email unverified";
  // };

  console.groupEnd();

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
        <Tooltip label="Enter desired USA Wallet user name.">
          <Input
            placeholder="User Name *"
            type="text"
            variant="filled"
            value={userName}
            onChange={(event) => setUserName(event.currentTarget.value)}
            boxShadow="dark-lg"
          />
        </Tooltip>
      )}
      <Tooltip label="Enter email where you wish to recieve notifications.">
        <Input
          className={isAuthenticated ? "email verified" : "email"}
          placeholder="E-mail *"
          type="email"
          variant="filled"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          boxShadow="dark-lg"
        />
      </Tooltip>
      {user && user.attributes.emailVerified && (
        <Alert status="warning">
          <AlertIcon />
          Check your email for validation link.
        </Alert>
      )}
      <Tooltip label="Enter a password.">
        <Input
          placeholder="Password *"
          type="password"
          variant="filled"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          boxShadow="dark-lg"
        />
      </Tooltip>

      {!isAuthenticated ? (
        <>
          <HStack>
            <Tooltip label="Use the entered e-mail and password to create a new USA Wallet account.">
              <Button onClick={handleSignUp} boxShadow="dark-lg">
                Sign up
              </Button>
            </Tooltip>
            <Tooltip label="Log into USA Wallet with your e-mail and password.">
              <Button onClick={handleLogIn} boxShadow="dark-lg">
                Log in
              </Button>
            </Tooltip>
          </HStack>
          <Tooltip label="Send password reset e-mail (coming soon).">
            <Button
              onClick={handlePasswordReset}
              boxShadow="dark-lg"
              disabled="1"
            >
              Password Reset
            </Button>
          </Tooltip>
          <Tooltip label="Use Metamask to authenticate into your USA Wallet account.">
            <Button
              isLoading={isAuthenticating}
              onClick={handleAuthenticate}
              boxShadow="dark-lg"
            >
              Use MetaMask
            </Button>
          </Tooltip>
        </>
      ) : (
        <Tooltip label="Update your USA Wallet account to the currently entered user name, e-mail, and password.">
          <Button onClick={handleSave} boxShadow="dark-lg">
            Update signature.
          </Button>
        </Tooltip>
      )}
    </VStack>
  );
};
