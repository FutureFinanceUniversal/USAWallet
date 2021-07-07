import { Avatar, Flex, Text, VStack } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { usePositions } from "../../hooks/usePositions";

export const TokenTable = () => {
  const { positions, isLoading, totalValue } = usePositions();

  console.groupCollapsed("TokenTable");
  console.log(!isLoading && positions);

  return (
    <VStack borderWidth={2} borderRadius={10} width="100%" padding={5}>
      {!isLoading && <Text>Total Value: ${totalValue}</Text>}
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
                <Text>Transaction list should go here.</Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </VStack>
  );
};
