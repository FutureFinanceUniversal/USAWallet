import { HStack, VStack, Text } from "@chakra-ui/react";

import { useActions } from "../../contexts/actionsContext";
import { FromSelect } from "../Bits/FromSelect";
import { useExperts } from "../../contexts/expertsContext";
import { ModeSelect } from "../Bits/ModeSelect";
import { ToSelect } from "../Bits/ToSelect";
import { ToAddress } from "../Bits/ToAddress";
import { AmountSelect } from "../Bits/AmountSelect";
import { StartSend } from "../Bits/StartSend";

export const ActionPanel = () => {
  const { actionMode } = useExperts("none");
  const { txAmount, fromSymbol, toAddress } = useActions();

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

          {txAmount !== 0 && actionMode === "swap" && (
            <HStack>
              <ToSelect visible={fromSymbol === "" ? "hidden" : "visible"} />
            </HStack>
          )}
          {txAmount !== 0 && actionMode === "send" && (
            <HStack>
              <ToAddress visible={fromSymbol === "" ? "hidden" : "visible"} />
              <StartSend visible={toAddress === "" ? "hidden" : "visible"} />
            </HStack>
          )}
        </>
      )}
    </VStack>
  );
};
