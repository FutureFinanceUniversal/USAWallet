import { Box, Flex, Image, Text, Spacer } from "@chakra-ui/react";
import { Assistants } from "../Blocks/Assistants";
import { useMoralis } from "react-moralis";
import React from "react";

import LadyLiberty from "../../media/Padding/LadyLiberty.jpg";

export const SideShow = () => {
  const { isAuthenticated } = useMoralis();
  return (
    <Flex direction="column" alignItems="center">
      <Text>
        ----------<i>Side Show</i>----------
      </Text>
      <Spacer />
      {isAuthenticated ? (
        <Box borderRadius={2} height="37vh" />
      ) : (
        <Box
          marginTop="50px"
          borderWidth="1px"
          borderRadius="3xl"
          overflow="hidden"
        >
          <Image src={LadyLiberty} alt="LadyLiberty" />
        </Box>
      )}
      <Spacer />
      <Assistants />
    </Flex>
  );
};
