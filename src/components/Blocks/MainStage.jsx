import { Flex, Text, VStack } from "@chakra-ui/react";
import { TokenTable } from "./TokenTable";
import React from "react";

export const MainStage = () => {
  return (
    <Flex justifyContent="center">
      <VStack>
        <Text>Main Stage.</Text>
        <TokenTable />
      </VStack>
    </Flex>
  );
};
