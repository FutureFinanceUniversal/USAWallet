import { Avatar, Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { useCoinData } from "../../hooks/coinData";
import { c2 } from "../Support/utils";

export const Dashboard = () => {
  const { coinList, portfolioValue, isLoading } = useCoinData();

  if (isLoading) {
    return (
      <Flex>
        <Box>
          <Heading>Dashboard</Heading>
        </Box>
        <Text>Loading...</Text>
      </Flex>
    );
  } else {
    return (
      <VStack boderWidth="5px" width="50vw" align="center">
        <Heading>Dashboard</Heading>
        <Flex borderWidth="5px" padding="20px">
          <Text>Portfolio Total Value: {c2.format(portfolioValue)}</Text>
          <Accordion allowToggle>
            {coinList.map((token, i) => (
              <AccordionItem>
                <AccordionButton>
                  {token.image ? (
                    <Avatar src={token.image} alt={token.symbol} />
                  ) : (
                    <Avatar>
                      <WarningIcon />
                    </Avatar>
                  )}
                  <Box flex="1" textAlign="left">
                    {token.valueTxt}
                  </Box>
                  <Box flex="1" textAlign="right">
                    {c2.format(token.price)}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  Lorem ipsum dollar sit amet, consectetur adipiscing elit
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Flex>
      </VStack>
    );
  }
};
