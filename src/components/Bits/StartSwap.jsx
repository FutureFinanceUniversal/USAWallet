import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Tooltip,
} from "@chakra-ui/react";
import { useActions } from "../../contexts/actionsContext";
// import { useSwap } from "../../hooks/useSwap";

export const StartSwap = () => {
  const { fromSymbol, fromAddress, toSymbol, toAddress, txAmount } =
    useActions();
  // const swapTransaction = useSwap({});

  return (
    <Box>
      <FormControl id="swapstart">
        <Tooltip label="Get quote for the current toke swap selections.">
          <Button
            enabled={txAmount > 0}
            onClick={() => {
              console.groupCollapsed("StartSwap");
              console.debug("Received fromSymbol: ", fromSymbol);
              console.debug("Received fromAddress: ", fromAddress);
              console.debug("Received toSymbol: ", toSymbol);
              console.debug("Received toAddress: ", toAddress);
              console.debug("Received txAmount: ", txAmount);
              console.groupEnd();
            }}
          >
            Preview Swap Order
          </Button>
        </Tooltip>
        <FormErrorMessage>Well shoot.</FormErrorMessage>
      </FormControl>
    </Box>
  );
};
