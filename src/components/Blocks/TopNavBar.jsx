import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";

import { ExpertButton } from "./ExpertButton";
import { LightSwitch } from "./LightSwitch";
import { AuthButton } from "./AuthButton";
import { ProfileAvatar } from "./ProfileAvatar";

export const TopNavBar = () => {
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
      <ExpertButton />
      <LightSwitch />
      <AuthButton />
      <ProfileAvatar />
    </Flex>
  );
};
