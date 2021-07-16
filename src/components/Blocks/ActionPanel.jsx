import { useState } from "react";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { FromSelect } from "../Bits/FromSelect";
import { useExperts } from "../../contexts/expertsContext";
import { ModeSelect } from "../Bits/ModeSelect";
import { ToSelect } from "../Bits/ToSelect";
import { ToAddress } from "../Bits/ToAddress";
import { AmountSelect } from "../Bits/AmountSelect";
import { StartSwap } from "../Bits/StartSwap";
import { StartSend } from "../Bits/StartSend";
import { ReceiveCode } from "../Bits/ReceiveCode";

export const ActionPanel = () => {
  const [fromSymbol, setFromSymbol] = useState("");
  const [toSymbol, setToSymbol] = useState("");
  const [toAddress, setToAddress] = useState("0x");
  const [TxAmount, setTxAmount] = useState(0);
  const { actionMode } = useExperts("none");

  console.groupCollapsed("Swapper");
  console.debug("fromSymbol: ", fromSymbol);
  console.debug("toSymbol: ", toSymbol);
  console.debug("swapAmount: ", TxAmount);
  console.groupEnd();

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
      <FromSelect setFromSymbol={setFromSymbol} />
      {fromSymbol !== "" && (
        <>
          <ModeSelect />
          {actionMode === "swap" && (
            <VStack>
              <ToSelect
                setToSymbol={setToSymbol}
                visible={fromSymbol === "" ? 0 : 1}
              />
              <HStack>
                <AmountSelect
                  fromSymbol={fromSymbol}
                  setTxAmount={setTxAmount}
                />
                <StartSwap
                  fromSymbol={fromSymbol}
                  toSymbol={toSymbol}
                  swapAmount={TxAmount}
                />
              </HStack>
            </VStack>
          )}
          {actionMode === "send" && (
            <VStack>
              <ToAddress
                setToAddress={setToAddress}
                visible={fromSymbol === "" ? 0 : 1}
              />
              <HStack>
                <AmountSelect
                  fromSymbol={fromSymbol}
                  setTxAmount={setTxAmount}
                />
                <StartSend
                  fromSymbol={fromSymbol}
                  toAddress={toAddress}
                  swapAmount={TxAmount}
                />
              </HStack>
            </VStack>
          )}
          {actionMode === "receive" && <ReceiveCode />}
        </>
      )}
    </VStack>
  );
};
