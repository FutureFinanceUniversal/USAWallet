import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { usePositions } from "../../hooks/usePositions";
import { TransactionList } from "./TransactionList";
// import { TokenShiftList } from "./TokenShiftList";

export const TokenTable = () => {
  const { positions, isLoading, totalValue } = usePositions();

  return (
    <VStack borderWidth={4} borderRadius="3xl" width="100%" padding={5}>
      {!isLoading && (
        <Text>Total Value: ${parseFloat(totalValue).toFixed(2)}</Text>
      )}
      <Accordion allowToggle width="100%">
        {!isLoading &&
          positions.map((position) => (
            <AccordionItem key={position.name} width="100%">
              <AccordionButton>
                <Flex gap={6}>
                  <Box width="50px">
                    <Avatar
                      name={position.symbol}
                      src={position.image}
                      size="sm"
                    />
                  </Box>
                  <Box width="80px">
                    <Text ml={2} textAlign="left">
                      {position.name}
                    </Text>
                  </Box>
                  <Box width="70px">
                    <Text ml={2} textAlign="left">
                      {position.tokens.toPrecision(3)}
                    </Text>
                  </Box>
                  <Box width="170px">
                    <Text ml={2} textAlign="left">
                      @ ${position.price && position.price.toFixed(2)}/
                      {position.symbol && position.symbol.toUpperCase()}
                    </Text>
                  </Box>
                  <Box width="80px">
                    <Text ml={2} textAlign="left">
                      {" "}
                      = ${position.value.toFixed(2)}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </Flex>
              </AccordionButton>
              <AccordionPanel pb={4}>
                {position.name === "Ether" && (
                  <TransactionList chain="eth" decimals={position.decimals} />
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </VStack>
  );
};
