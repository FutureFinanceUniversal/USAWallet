import { Flex, Text, VStack } from "@chakra-ui/react";
import { ActionPanel } from "../Blocks/ActionPanel";
import { useMoralis } from "react-moralis";
// import { TokenTable } from "../Blocks/TokenTable";
import React from "react";

export const MainStage = () => {
  const { isAuthenticated } = useMoralis();
  console.groupCollapsed("MainStage");
  console.log("Received isAuthenticated: ", isAuthenticated);

  return (
    <Flex justifyContent="center">
      <VStack spacing={5}>
        <Text>
          ----------<i>Main Stage</i>----------
        </Text>
        {isAuthenticated ? (
          <>
            <Text> Authenticated. </Text>
            <ActionPanel />
            {/* <TokenTable /> */}
          </>
        ) : (
          <Text> Unauthenticated. </Text>
        )}
      </VStack>
    </Flex>
  );
};
