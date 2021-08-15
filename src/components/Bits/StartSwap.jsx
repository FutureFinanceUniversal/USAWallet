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
              console.log("Received fromSymbol: ", fromSymbol);
              console.log("Received fromAddress: ", fromAddress);
              console.log("Received toSymbol: ", toSymbol);
              console.log("Received toAddress: ", toAddress);
              console.log("Received txAmount: ", txAmount);
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
