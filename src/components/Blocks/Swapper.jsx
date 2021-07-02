import { useState } from "react";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import { FromSelect } from "../Bits/FromSelect";
import { ToSelect } from "../Bits/ToSelect";
import { AmountSelect } from "../Bits/AmountSelect";
import { StartSwap } from "../Bits/StartSwap";

export const Swapper = () => {
  const { fromSymbol, setFromSymbol } = useState("");
  const { toSymbol, setToSymbol } = useState("");
  const { swapAmount, setSwapAmount } = useState(0);

  console.groupCollapsed("Swapper");
  console.debug("fromSymbol: ", fromSymbol);
  console.debug("toSymbol: ", toSymbol);
  console.debug("swapAmount: ", swapAmount);
  console.groupEnd();

  return (
    <Flex flex-direction="column" alignItems="center" justifyContent="center">
      <Text>Swap Tokens</Text>
      <FromSelect setFromSymbol={setFromSymbol} />
      <Spacer />
      <ToSelect setToSymbol={setToSymbol} />
      <Spacer />
      <AmountSelect fromSymbol={fromSymbol} setSwapAmount={setSwapAmount} />
      <Spacer />
      <StartSwap
        fromSymbol={fromSymbol}
        toSymbol={toSymbol}
        swapAmount={swapAmount}
      />
    </Flex>
  );
};
