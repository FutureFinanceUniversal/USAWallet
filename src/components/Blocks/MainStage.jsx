import { Flex, Text, VStack } from "@chakra-ui/react";
import { Balance } from "./Balance";
import React from "react";

export const MainStage = () => {
  return (
    <Flex justifyContent="center">
      <VStack>
        <Text>Main Stage.</Text>
        <Balance />
      </VStack>
    </Flex>
  );
};
