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
      borderRadius={10}
      paddingLeft={10}
      paddingRight={10}
      paddingTop={5}
      paddingBottom={5}
      spacing="px"
    >
      <Text>Take Action</Text>
      <FromSelect setFromSymbol={setFromSymbol} />
      <ModeSelect />
      {actionMode === "swap" && (
        <ToSelect
          setToSymbol={setToSymbol}
          visible={fromSymbol === "" ? 0 : 1}
        />
      )}
      {actionMode === "send" && (
        <ToAddress
          setToAddress={setToAddress}
          visible={fromSymbol === "" ? 0 : 1}
        />
      )}
      {actionMode !== "receive" && (
        <HStack>
          {actionMode === "swap" && (
            <AmountSelect fromSymbol={fromSymbol} setTxAmount={setTxAmount} />
          )}
          {actionMode === "send" && (
            <AmountSelect fromSymbol={fromSymbol} setTxAmount={setTxAmount} />
          )}
          {actionMode === "swap" && (
            <StartSwap
              fromSymbol={fromSymbol}
              toSymbol={toSymbol}
              swapAmount={TxAmount}
            />
          )}
          {actionMode === "send" && (
            <StartSend
              fromSymbol={fromSymbol}
              toAddress={toAddress}
              sendAmount={TxAmount}
            />
          )}
        </HStack>
      )}
      {actionMode === "receive" && <ReceiveCode />}
    </VStack>
  );
};
