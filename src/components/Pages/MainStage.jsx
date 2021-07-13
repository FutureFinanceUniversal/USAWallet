import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { ActionPanel } from "../Blocks/ActionPanel";
import { useMoralis } from "react-moralis";
import { TokenTable } from "../Blocks/TokenTable";
import React from "react";

import WheatField from "../../media/Padding/wheatField.jpeg";

export const MainStage = () => {
  const { isAuthenticated, user } = useMoralis();
  console.groupCollapsed("MainStage");
  console.log("Received isAuthenticated: ", isAuthenticated);

  return (
    <Flex justifyContent="center">
      <VStack spacing={9}>
        <Text>
          ----------<i>Main Stage</i>----------
        </Text>
        {isAuthenticated ? (
          <>
            <Text>Ethereum address: {user.attributes["ethAddress"]}</Text>
            <ActionPanel />
            <TokenTable />
          </>
        ) : (
          <>
            <Box height="10px" />
            <Box borderRadius="3xl" margin="20px" overflow="hidden">
              <img src={WheatField} alt="Amber Waves of Grain" />
            </Box>
          </>
        )}
      </VStack>
    </Flex>
  );
};
