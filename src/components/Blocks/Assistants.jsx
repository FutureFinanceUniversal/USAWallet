import { Box, Text, Flex, Spacer } from "@chakra-ui/react";
import { MetaMask } from "../Guides/MetaMask";
import { PayPal } from "../Guides/PayPal";
import { UniSwap } from "../Guides/UniSwap";
import { useState } from "react";
import { useExperts } from "../../contexts/expertsContext";

export const Assistants = () => {
  const [mode, switchMode] = useState("UniSwap");
  const [dialog, setDialog] = useState(
    "Welcome to USA Wallet.  Simple, Safe, Secure."
  );
  const { expertsOn } = useExperts();

  const pokeNewMode = () => {
    console.groupCollapsed("pokeNewMode");
    switch (mode) {
      case "UniSwap":
        switchMode("PayPal");
        setDialog(
          '"Ask not what your fiat can do for you.  Ask what crypto can you purchase!"'
        );
        break;
      case "PayPal":
        switchMode("MetaMask");
        setDialog('"Find freedom with MetaMask."');
        break;
      case "MetaMask":
        switchMode("UniSwap");
        setDialog('"A token saved is a token earning."');
        break;
      default:
        switchMode("UniSwap");
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
        {mode === "UniSwap" && <UniSwap poke={pokeNewMode} speak={setDialog} />}
        {mode === "PayPal" && <PayPal poke={pokeNewMode} speak={setDialog} />}
        {mode === "MetaMask" && (
          <MetaMask poke={pokeNewMode} speak={setDialog} />
        )}
      </Flex>
    );
  } else {
    return null;
  }
};
