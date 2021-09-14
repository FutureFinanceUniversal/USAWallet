import { Button, Tooltip } from "@chakra-ui/react";

import { useQuote } from "../../contexts/quoteContext";
import { useExperts } from "../../contexts/expertsContext";
import { useActions } from "../../contexts/actionsContext";

import { useMoralis } from "react-moralis";

import { useSendTransaction } from "../../hooks/useSendTransaction";

const oneInchApprove = "https://api.1inch.exchange/v3.0/1/approve/calldata";

export const ApproveButton = (props) => {
  const { setQuoteValid, fromToken, toToken } = useQuote();
  const { txAmount } = useActions();
  const { user } = useMoralis();
  const { setDialog } = useExperts();

  const preApprove = async () => {
    setDialog(
      "Pre-approving 1Inch to transact " + txAmount + " of your ",
      fromToken?.symbol.toUpperCase()
    );
    await fetch(
      oneInchApprove +
        "?tokenAddress=" +
        fromToken?.address +
        "&amount=" +
        txAmount
    )
      .then((response) => response.json())
      .then((response) => {
        setDialog("1Inch approval submitted.");
        console.groupCollapsed("DoItButton::preApprove");
        console.log("fromToken?.address:", fromToken?.address);
        console.log("amount:", txAmount);
        console.log("Response:", response);
        console.groupEnd();
        const {
          isLoading,
          transactionHash,
          transactionReceipt,
          confirmationNumber,
        } = useSendTransactions({
          description: "Pre-approve",
          data: response.data,
          gasPrice: response.gasPrice,
          to: response.to,
          value: props.value,
        });
      });
  };

  const handlePress = async () => {
    await preApprove();

    if (1) {
      setDialog(
        "Submitting swap transaction.  Please review and sign in MetaMask."
      );
      await fetch(
        oneInchSwap +
          "fromTokenAddress=" +
          fromToken.address +
          "&toTokenAddress=" +
          toToken.address +
          "&amount=" +
          txAmount +
          "&fromAddress=" +
          user?.attributes["ethAddress"] +
          "&slippage=3"
      )
        .then((response) => response.json())
        .then((response) => {
          setDialog("Recieved.  Check console log.");
          console.groupCollapsed("DoItButton::handlePress");
          console.log("fromTokenAddress=", fromToken.address);
          console.log("toTokenAddress=", toToken.address);
          console.log("amount=", txAmount);
          console.log("fromAddress=", user?.attributes["ethAddress"]);
          console.log("response:", response);
          console.groupEnd();
        });
    } else {
      setDialog("Debug mode.  Check console log.");
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
