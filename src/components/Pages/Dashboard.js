import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useCoinData } from "../../hooks/coinData";
import { WarningIcon } from "@chakra-ui/icons";
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
      <Container>
        <Box alignContent="center">
          <Heading>Dashboard</Heading>
        </Box>
        <VStack boderWidth="5px">
          <Box>
            <Heading>Portfolio Total Value</Heading>
            {c2.format(portfolioValue)}
          </Box>
          <Box>
            <Heading>Tokens</Heading>
          </Box>
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
        </VStack>
      </Container>
    );
  }
};
