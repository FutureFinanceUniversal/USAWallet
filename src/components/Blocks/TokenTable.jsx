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
  const { portfolio, waiting, totalValue } = usePositions();

  console.groupCollapsed("TokenTable");
  console.log(
    waiting ? "Waiting for data." : "Received portfolio: ",
    portfolio
  );
  console.groupEnd();

  return (
    <VStack borderWidth={2} borderRadius={10} width="100%" padding={5}>
      {!waiting && <Text>Total Value: ${totalValue}</Text>}
      <Accordion allowToggle width="100%">
        {!waiting &&
          portfolio.map((position) => (
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
                  <Text ml={2}>
                    {position &&
                      parseFloat(position.balance).toPrecision(3) /
                        10 ** position.decimals}{" "}
                    @ $16.23/{position.symbol} = $
                    {parseFloat(
                      (position.balance / 10 ** position.decimals) * 16.23
                    ).toFixed(2)}
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
