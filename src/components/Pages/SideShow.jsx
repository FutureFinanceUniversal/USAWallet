import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import { Assistants } from "../Blocks/Assistants";
import React from "react";

export const SideShow = () => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Text>
        ----------<i>Side Show</i>----------
      </Text>
      <Spacer />
      <Box borderRadius={2} height="37vh"></Box>
      <Spacer />
      <Assistants />
    </Flex>
  );
};
