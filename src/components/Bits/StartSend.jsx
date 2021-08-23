import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Tooltip,
} from "@chakra-ui/react";
import { useActions } from "../../contexts/actionsContext";
// import { useSwap } from "../../hooks/useSwap";

export const StartSend = () => {
  const { fromSymbol, fromAddress, toSymbol, toAddress, txAmount } =
    useActions();

  return (
    <Box>
      <FormControl id="sendstart">
        <Tooltip label="Preview token transmission.">
          <Button
            enabled={txAmount > 0 ? "true" : "false"}
            boxShadow="dark-lg"
            onClick={() => {
              console.groupCollapsed("StartSend");
              console.debug("Received fromSymbol: ", fromSymbol);
              console.debug("Received fromAddress: ", fromAddress);
              console.debug("Received toSymbol: ", toSymbol);
              console.debug("Received toAddress ", toAddress);
              console.debug("Received txAmount: ", txAmount);
              console.groupEnd();
            }}
          >
            Preview Send Order
          </Button>
        </Tooltip>
        <FormErrorMessage>Well shoot.</FormErrorMessage>
      </FormControl>
    </Box>
  );
};
