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
  const [fromAddress, setFromAddress] = useState("");
  const [toSymbol, setToSymbol] = useState("");
  const [toAddress, setToAddress] = useState("0x");
  const [TxAmount, setTxAmount] = useState(0);
  const { actionMode } = useExperts("none");

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
      <FromSelect
        setFromSymbol={setFromSymbol}
        setFromAddress={setFromAddress}
      />
      {fromSymbol !== "" && (
        <>
          <HStack>
            <Text>Select amount: </Text>
            <AmountSelect fromSymbol={fromSymbol} setTxAmount={setTxAmount} />
          </HStack>
          {TxAmount !== 0 && <ModeSelect />}

          {actionMode === "swap" && (
            <HStack>
              <ToSelect
                setToSymbol={setToSymbol}
                setToAddress={setToAddress}
                visible={fromSymbol === "" ? 0 : 1}
              />
              <StartSwap
                fromSymbol={fromSymbol}
                fromAddress={fromAddress}
                toSymbol={toSymbol}
                toAddress={toAddress}
                swapAmount={TxAmount}
              />
            </HStack>
          )}
          {actionMode === "send" && (
            <HStack>
              <ToAddress
                setToAddress={setToAddress}
                visible={fromSymbol === "" ? 0 : 1}
              />
              <StartSend
                fromSymbol={fromSymbol}
                fromAddress={fromAddress}
                toAddress={toAddress}
                swapAmount={TxAmount}
              />
            </HStack>
          )}
          {actionMode === "receive" && <ReceiveCode />}
        </>
      )}
    </VStack>
  );
};
