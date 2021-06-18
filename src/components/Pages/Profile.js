import {
  Button,
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  IconButton,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { ErrorBox } from "../Support/Error";

export const Profile = () => {
  const { user, setUserData, userError, isUserUpdating } = useMoralis();

  const [username, setUserName] = useState(user.attributes.username);
  const [email, setEMail] = useState(user.attributes.email);
  const [password, setPassWord] = useState(user.attributes.password);
  const [showPassword, togglePassword] = useState(false);

  const handleSave = () => {
    setUserData({
      username,
      email,
      password: password === "" ? undefined : password,
    });
  };

  return (
    <Box width="200px">
      <VStack>
        <Heading width="50vw" mt={3} mb={4} align="center">
          Profile
        </Heading>
        <Flex
          borderWidth="5px"
          width="50vw"
          borderRadius="lg"
          padding="30px"
          boxShadow="dark-lg"
        >
          <VStack spacing={2}>
            {userError && (
              <ErrorBox
                title="User data update failed."
                message={userError.message}
              />
            )}
            <HStack width="42vw">
              <Text width="24vw">User Name</Text>
              <Input
                value={username}
                onChange={(event) => setUserName(event.currentTarget.value)}
              />
            </HStack>
            <HStack width="42vw">
              <Text width="24vw">E-Mail</Text>
              <Input
                value={email}
                type="email"
                onChange={(event) => setEMail(event.currentTarget.value)}
              />
            </HStack>
            <HStack width="42vw">
              <Text width="30vw">New Password?</Text>
              <Input
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(event) => setPassWord(event.currentTarget.value)}
              />
              <IconButton
                variant="outline"
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => togglePassword(showPassword ? false : true)}
              />
            </HStack>
            <Spacer />
            <Button onClick={handleSave} isLoading={isUserUpdating}>
              Save Changes
            </Button>
          </VStack>
        </Flex>
      </VStack>
    </Box>
  );
};
