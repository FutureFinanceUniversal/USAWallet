import { Flex, Text, VStack } from "@chakra-ui/react";
import { Swapper } from "../Blocks/Swapper";
import { TokenTable } from "../Blocks/TokenTable";
import React from "react";

export const MainStage = () => {
  return (
    <Flex justifyContent="center">
      <VStack>
        <Text>Main Stage.</Text>
        <Swapper />
        <TokenTable />
      </VStack>
    </Flex>
  );
};
