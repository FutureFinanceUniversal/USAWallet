import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import { Assistants } from "../Blocks/Assistants";
import React from "react";

export const SideShow = () => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Text>Side show.</Text>
      <Spacer />
      <Box borderRadius={2} height="37vh"></Box>
      <Spacer />
      <Assistants />
    </Flex>
  );
};
