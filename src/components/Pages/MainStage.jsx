import { Flex, Text, VStack } from "@chakra-ui/react";
import { PositionsProvider } from "../../contexts/positionsContext";
// import { Swapper } from "../Blocks/Swapper";
import { useMoralis } from "react-moralis";
import { TokenTable } from "../Blocks/TokenTable";
import React from "react";

export const MainStage = () => {
  const { isAuthenticated } = useMoralis();
  console.groupCollapsed("MainStage");
  console.log("Received isAuthenticated: ", isAuthenticated);

  return (
    <Flex justifyContent="center">
      <VStack>
        <Text>Main Stage.</Text>
        {isAuthenticated ? (
          <>
            <Text> Authenticated. </Text>
            <PositionsProvider>
              {/* <Swapper /> */}
              <TokenTable />
            </PositionsProvider>
          </>
        ) : (
          <Text> Unauthenticated. </Text>
        )}
      </VStack>
    </Flex>
  );
};
