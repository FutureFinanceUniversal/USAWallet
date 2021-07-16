import { Box, Flex, Text, HStack, VStack } from "@chakra-ui/react";
import { CopyAddress } from "../Bits/CopyAddress";
import { ActionPanel } from "../Blocks/ActionPanel";
import { useMoralis } from "react-moralis";
import { TokenTable } from "../Blocks/TokenTable";
import React from "react";

import WheatField from "../../media/Padding/wheatField.jpeg";

export const MainStage = () => {
  const { isAuthenticated, user } = useMoralis();

  return (
    <Flex justifyContent="center">
      <VStack spacing={9} overflow="hidden">
        <Text>
          ----------<i>Main Stage</i>----------
        </Text>
        {isAuthenticated ? (
          <>
            <HStack>
              {user !== null && (
                <Text>Ethereum address: {user?.attributes["ethAddress"]}</Text>
              )}
              <CopyAddress mode="copy" />
            </HStack>
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
