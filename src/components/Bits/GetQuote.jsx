import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Tooltip,
} from "@chakra-ui/react";
import { useActions } from "../../contexts/actionsContext";
import { useState } from "react";

const oneInchHead = "https://api.1inch.exchange/v3.0/1/quote?";

export const GetQuote = () => {
  const { fromSymbol, fromAddress, toSymbol, toAddress, txAmount } =
    useActions();
  const [quote, setQuote] = useState("");

  const goto1Inch = async (quote) => {
    console.groupCollapsed();
    console.log(
      "Transferring ",
      txAmount,
      " ",
      fromSymbol,
      " to ",
      toSymbol,
      "..."
    );
    console.groupEnd();

    await fetch(
      oneInchHead +
        "fromTokenAddress=" +
        fromAddress +
        "&toTokenAddress=" +
        toAddress +
        "&amount=" +
        txAmount
    )
      .then((response) => response.json())
      .then((oneInchQuote) => {
        console.log("Recieved Quote:", oneInchQuote);
        setQuote(oneInchQuote);
      });
  };

  return (
    <Box>
      <FormControl id="swapstart">
        <Tooltip label="Get quote for the current toke swap selections.">
          <Button
            enabled={txAmount > 0}
            onClick={async () => {
              await goto1Inch();
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
