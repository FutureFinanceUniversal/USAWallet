import { Avatar, Flex, Text, VStack } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { usePositions } from "../../hooks/usePositions";
import { TransactionList } from "./TransactionList";
import { TokenShiftList } from "./TokenShiftList";

export const TokenTable = () => {
  const { positions, isLoading, totalValue } = usePositions();

  console.groupCollapsed("TokenTable");
  console.log(!isLoading && positions);

  return (
    <VStack borderWidth={2} borderRadius={10} width="100%" padding={5}>
      {!isLoading && (
        <Text>Total Value: ${parseFloat(totalValue).toFixed(2)}</Text>
      )}
      <Accordion allowToggle width="100%">
        {!isLoading &&
          positions.map((position) => (
            <AccordionItem key={position.name} width="100%">
              <AccordionButton>
                <Flex
                  width="100%"
                  alignItems="left"
                  justifyContent="space-between"
                >
                  <Avatar
                    name={position.symbol}
                    src={position.image}
                    size="sm"
                  />
                  <Text ml={2}>{position.name}</Text>
                  <Text ml={2}>{position.valueString}</Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {position.name === "Ether" ? (
                  <TransactionList chain="eth" decimals={position.decimals} />
                ) : (
                  <Text>Coming Soon...</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </VStack>
  );
};
