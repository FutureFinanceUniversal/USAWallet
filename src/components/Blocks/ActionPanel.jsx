import { HStack, VStack, Text } from "@chakra-ui/react";

import { useActions } from "../../contexts/actionsContext";
import { useExperts } from "../../contexts/expertsContext";

import { FromSelect } from "../Bits/FromSelect";
import { AmountSelect } from "../Bits/AmountSelect";
import { ModeSelect } from "../Bits/ModeSelect";

// Swap mode.
import { ToSelect } from "../Bits/ToSelect";
import { RequestQuote } from "../Bits/RequestQuote";

// Send mode.
import { ToAddress } from "../Bits/ToAddress";
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

          {txAmount !== 0 && actionMode === "swap" && (
            <HStack>
              <ToSelect visible={fromSymbol === "" ? "hidden" : "visible"} />
              {toSymbol !== "" && <RequestQuote />}
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
