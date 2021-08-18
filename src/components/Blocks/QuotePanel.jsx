import { Avatar, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuote } from "../../contexts/quoteContext";

export const QuotePanel = () => {
  const {
    setQuoteValid,
    fromToken,
    fromTokenAmount,
    protocols,
    toToken,
    toTokenAmount,
    estimatedGas,
  } = useQuote();

  return (
    <VStack>
      <Text>Swap Estimate:</Text>
      <HStack>
        <Text>Trade {fromTokenAmount}</Text>
        <Avatar name={fromToken.name} src={fromToken.logoURI} size="sm" />
        <Text>{fromToken.symbol}</Text>
      </HStack>
      <HStack>
        <Text>For {toTokenAmount}</Text>
        <Avatar name={toToken.name} src={toToken.logoURI} size="sm" />
        <Text>{toToken.symbol}</Text>
      </HStack>
      <HStack>
        <Text>Spending {estimatedGas} gas across: </Text>
        {protocols.map((dex) => (
          <Text> {dex[0].name}</Text>
        ))}
      </HStack>
      <HStack>
        <Button>Do it.</Button>
        <Button onClick={setQuoteValid("false")}>Cancel</Button>
      </HStack>
    </VStack>
  );
};
