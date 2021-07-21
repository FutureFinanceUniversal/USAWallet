import { HStack, VStack, Text } from "@chakra-ui/react";

import { useActions } from "../../contexts/actionsContext";
import { FromSelect } from "../Bits/FromSelect";
import { useExperts } from "../../contexts/expertsContext";
import { ModeSelect } from "../Bits/ModeSelect";
import { ToSelect } from "../Bits/ToSelect";
import { ToAddress } from "../Bits/ToAddress";
import { AmountSelect } from "../Bits/AmountSelect";
import { StartSwap } from "../Bits/StartSwap";
import { StartSend } from "../Bits/StartSend";

export const ActionPanel = () => {
  const { actionMode } = useExperts("none");
  const { txAmount, fromSymbol, toSymbol, toAddress } = useActions();

  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      borderWidth={2}
      borderRadius="3xl"
      paddingLeft={10}
      paddingRight={10}
      paddingTop={5}
      paddingBottom={5}
      spacing={6}
    >
      <Text>Create Action</Text>
      <FromSelect />
      {fromSymbol !== "" && (
        <>
          <HStack>
            <Text>Select amount: </Text>
            <AmountSelect />
          </HStack>
          {txAmount !== 0 && <ModeSelect />}

          {actionMode === "swap" && (
            <HStack>
              <ToSelect visible={fromSymbol === "" ? 0 : 1} />
              <StartSwap visible={toSymbol === "" ? 0 : 1} />
            </HStack>
          )}
          {actionMode === "send" && (
            <HStack>
              <ToAddress visible={fromSymbol === "" ? 0 : 1} />
              <StartSend visible={toAddress === "" ? 0 : 1} />
            </HStack>
          )}
        </>
      )}
    </VStack>
  );
};
