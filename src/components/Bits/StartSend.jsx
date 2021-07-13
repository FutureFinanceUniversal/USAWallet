import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Tooltip,
} from "@chakra-ui/react";
// import { useSwap } from "../../hooks/useSwap";

export const StartSend = (props) => {
  // const swapTransaction = useSwap({});
  console.groupCollapsed("StartSwap");
  console.debug("Received fromSymbol: ", props.fromSymbol);
  console.debug("Received toAddress ", props.toAddress);
  console.debug("Received sendAmount: ", props.sendAmount);
  console.groupEnd();
  return (
    <Box>
      <FormControl id="sendstart">
        <Tooltip label="Preview token transmission.">
          <Button enabled={props.sendAmount > 0}>Preview Send Order</Button>
        </Tooltip>
        <FormErrorMessage>Well shoot.</FormErrorMessage>
      </FormControl>
    </Box>
  );
};
