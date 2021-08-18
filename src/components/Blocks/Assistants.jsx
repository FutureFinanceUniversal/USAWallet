import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { MetaMask } from "../Guides/MetaMask";
import { PayPal } from "../Guides/PayPal";
import { UniSwap } from "../Guides/UniSwap";
import { useExperts } from "../../contexts/expertsContext";

export const Assistants = () => {
  const { expertsOn, actionMode, dialog } = useExperts();

  if (expertsOn === true) {
    return (
      <Flex margin={5}>
        <Box width="200px" margin={7} padding={3} text-align="center">
          <Text text-align="center">{dialog}</Text>
        </Box>
        <Spacer />
        <Box>
          {actionMode === "swap" && <UniSwap />}
          {actionMode === "recieve" && <PayPal />}
          {actionMode === "invest" && <MetaMask />}
          {actionMode === "send" && <MetaMask />}
        </Box>
      </Flex>
    );
  } else {
    return null;
  }
};
