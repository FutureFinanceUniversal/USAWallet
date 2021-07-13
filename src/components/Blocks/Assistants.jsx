import { Box, Text, Flex, Spacer } from "@chakra-ui/react";
import { MetaMask } from "../Guides/MetaMask";
import { PayPal } from "../Guides/PayPal";
import { UniSwap } from "../Guides/UniSwap";
import { useExperts } from "../../contexts/expertsContext";

export const Assistants = () => {
  const { expertsOn, actionMode, dialog, setDialog } = useExperts();

  const pokeNewMode = () => {
    console.groupCollapsed("pokeNewMode");
    switch (actionMode) {
      case "swap": // Ben Franklin : Uniswap
        setDialog('"A token saved is a token earning."');
        break;
      case "send": // Lady Liberty : MetaMask
        setDialog('"Find freedom with MetaMask."');
        break;
      case "receive": // Uncle Sam : PayPal
        setDialog(
          '"Ask not what your fiat can do for you.  Ask what crypto can you purchase!"'
        );
        break;
      default:
        setDialog("Welcome to USA Wallet.  Simple, Safe, Secure.");
    }
    console.groupEnd();
  };

  if (expertsOn === true) {
    return (
      <Flex direction="column">
        <Spacer />
        <Box
          d="flex"
          borderWidth={2}
          margin={4}
          padding={3}
          borderRadius="10px"
          justifyContent="center"
          alignItems="center"
        >
          <Text justifyContent="center" alignItems="center">
            {dialog}
          </Text>
        </Box>
        <Spacer />
        {actionMode === "swap" && (
          <UniSwap poke={pokeNewMode} speak={setDialog} />
        )}
        {actionMode === "recieve" && (
          <PayPal poke={pokeNewMode} speak={setDialog} />
        )}
        {actionMode === "send" && (
          <MetaMask poke={pokeNewMode} speak={setDialog} />
        )}
        {actionMode === "recieve" && (
          <PayPal poke={pokeNewMode} speak={setDialog} />
        )}
      </Flex>
    );
  } else {
    return null;
  }
};
