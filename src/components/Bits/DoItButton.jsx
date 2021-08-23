import { Button, Tooltip } from "@chakra-ui/react";
import { useQuote } from "../../contexts/quoteContext";
import { useExperts } from "../../contexts/expertsContext";
import { useActions } from "../../contexts/actionsContext";
import { useMoralis } from "react-moralis";

const oneInchHead = "https://api.1inch.exchange/v3.0/1/swap?";
const refAddress = "0x9A8A1C76e46940462810465F83F44dA706953F69";

export const DoItButton = (props) => {
  const { setQuoteValid, fromToken, toToken } = useQuote();
  const { txAmount } = useActions();
  const { user } = useMoralis();
  const { setDialog } = useExperts();

  const handlePress = async () => {
    setDialog("Executing swap...");

    if (0) {
      await fetch(
        oneInchHead +
          "fromTokenAddress=" +
          fromToken.address +
          "&toTokenAddress=" +
          toToken.address +
          "&amount=" +
          txAmount +
          "&fromAddress=" +
          user?.attributes["ethAddress"] +
          "&slippage=3" +
          "&referrerAddress=" +
          refAddress +
          "&fee=0.2"
      )
        .then((response) => response.json())
        .then((receipt) => {
          setDialog(
            "Recieved ",
            receipt.toTokenAmount,
            receipt.fromToken.symbol
          );
        });
    } else {
      setDialog("Check console log.");
      console.groupCollapsed("DoItButton");
      console.log("fromTokenAddress:", fromToken.address);
      console.log("toTokenAddress:", toToken.address);
      console.log("txAmount:", txAmount);
      console.log("fromAddress:", user?.attributes["ethAddress"]);
      console.log("slippage= 3%");
      console.log("referrerAddress:", refAddress);
      console.log("fee: 0.2%");
      console.groupEnd();
    }
    setQuoteValid(0);
  };

  return (
    <Tooltip label="Submit swap order.">
      <Button
        mr={2}
        mt={-2}
        className="ExpertButton"
        boxShadow="dark-lg"
        onClick={handlePress}
      >
        Do it.
      </Button>
    </Tooltip>
  );
};
