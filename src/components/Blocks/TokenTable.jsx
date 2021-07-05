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
  const { positions, waiting } = usePositions();

  console.groupCollapsed("TokenTable");
  console.log(
    waiting ? "Waiting for data." : "Received positions: ",
    positions
  );
  console.groupEnd();

  return (
    <VStack>
      {/* {!waiting && <Text>Total Value: ${totalValue}</Text>} */}
      <Accordion allowToggle>
        {!waiting &&
          positions.map((position) => (
            <AccordionItem key={position.name}>
              <AccordionButton>
                <Flex alignItems="left" justifyContent="space-between">
                  <Avatar
                    name={position.symbol}
                    src={position.image}
                    size="sm"
                  />
                  <Text ml={2}>{position.name}</Text>
                  <Text ml={2}>
                    {position.balance / 10 ** position.decimals}
                  </Text>
                  {/* <Text ml={2}>{position.valueString}</Text> */}
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {/* <Text>{position.description}</Text> */}
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </VStack>
  );
};
