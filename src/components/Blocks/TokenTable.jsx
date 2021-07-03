import { Avatar, Flex, Text, VStack } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { usePortfolio } from "../../hooks/usePortfolio";
import { TransactionList } from "./TransactionList";

export const TokenTable = () => {
  const { portfolio } = usePortfolio();

  console.groupCollapsed("TokenTable");
  console.debug("Received portfolio: ", portfolio);
  console.groupEnd();

  return (
    <VStack>
      <Text>Total Balance: ${portfolio.totalValue.toFixed(2)}</Text>
      <Accordion allowToggle>
        {portfolio.positions.map((position) => (
          <AccordionItem key={position.name}>
            <AccordionButton>
              <Flex alignItems="left" justifyContent="space-between">
                <Avatar
                  name={position.symbol}
                  src={position.image.thumb}
                  size="sm"
                />
                <Text ml={2}>{position.name}</Text>
                <Text ml={2}>{position.valueString}</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <TransactionList
                tokenName={position.name}
                symbol={position.symbol}
              />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  );
};
