import { Box, Flex, Image, Spacer, Text, useColorMode } from "@chakra-ui/react";

import { ExpertButton } from "../Bits/ExpertButton";
import { LightSwitch } from "../Bits/LightSwitch";
import { AuthButton } from "../Bits/AuthButton";
import { ProfileAvatar } from "../Bits/ProfileAvatar";
import { NetworkSelect } from "../Bits/NetworkSelect";
import { useMoralis } from "react-moralis";
import "./TopNavBar.css";

import USAWalletEagleLogo from "../../media/logos/USAWalletLogo.svg";

export const TopNavBar = (props) => {
  const { isAuthenticated } = useMoralis();
  const colorMode = useColorMode();
  return (
    <Flex
      className="HeaderOuterFlex"
      mt="2%"
      ml="1vw"
      mr="10vw"
      width="78vw"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box boxSize="70px">
        <Image
          name="USAWalletEagle"
          src={USAWalletEagleLogo}
          bg={colorMode === "light" ? "white" : "grey.900"}
          mr={1}
        />
      </Box>
      <Text
        className="BrandName"
        fontSize="5xl"
        bgGradient="linear(to-b,white,#0000FF,black)"
        bgClip="text"
      >
        USA Wallet
      </Text>
      <Spacer />
      {isAuthenticated && <ExpertButton />}
      <NetworkSelect />
      <LightSwitch />
      <AuthButton />
      {isAuthenticated && <ProfileAvatar />}
    </Flex>
  );
};
