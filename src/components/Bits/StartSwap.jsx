import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Tooltip,
} from "@chakra-ui/react";
// import { useSwap } from "../../hooks/useSwap";

export const StartSwap = (props) => {
  // const swapTransaction = useSwap({});
  console.groupCollapsed("StartSwap");
  console.debug("Received fromSymbol: ", props.fromSymbol);
  console.debug("Received toSymbol: ", props.toSymbol);
  console.debug("Received swapAmount: ", props.swapAmount);
  console.groupEnd();
  return (
    <Box>
      <FormControl id="swapstart">
        <Tooltip label="Get quote for the current toke swap selections.">
          <Button
            enabled={props.swapAmount > 0}
            // onClick={swapTransaction({
            //   fromSymbol: props.fromSymbol,
            //   toSymbol: props.toSymbol,
            //   swapAmount: props.swapAmount,
            // })}
          >
            Preview Swap Order
          </Button>
        </Tooltip>
        <FormErrorMessage>Well shoot.</FormErrorMessage>
      </FormControl>
    </Box>
  );
};
