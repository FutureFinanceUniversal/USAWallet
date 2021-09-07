import { useState } from "react";

import { Button, Tooltip } from "@chakra-ui/react";

import { useQuote } from "../../contexts/quoteContext";
import { useExperts } from "../../contexts/expertsContext";
import { useActions } from "../../contexts/actionsContext";

import { useMoralis } from "react-moralis";

const oneInchApprove = "https://api.1inch.exchange/v3.0/1/approve/calldata";
const oneInchSwap = "https://api.1inch.exchange/v3.0/1/swap?";
// const refAddress = "0x9A8A1C76e46940462810465F83F44dA706953F69";

export const DoItButton = (props) => {
  const { setQuoteValid, fromToken, toToken } = useQuote();
  const { txAmount } = useActions();
  const { Moralis, user } = useMoralis();
  const { setDialog } = useExperts();

  const [preApproved, setPreApproved] = useState(false);

  const preApproveTx = async () => {
    setDialog(
      "Retrieving pre-approval codes to swap " + txAmount + " of your ",
      fromToken?.symbol.toUpperCase()
    );
    const web3 = await Moralis.Web3.enable();
    await fetch(
      oneInchApprove +
        "?tokenAddress=" +
        fromToken?.address +
        "&amount=" +
        txAmount
    )
      .then((response) => response.json())
      .then((response) => {
        setDialog("1Inch approval code received.");
        console.groupCollapsed("DoItButton::preApprove");
        console.log("fromToken?.address:", fromToken?.address);
        console.log("amount:", txAmount);
        console.log("Response:", response);
        console.groupEnd();
        return response;
      })
      .then((response) => {
        setDialog(
          "Transmitting pre-approval code to the send token.  " +
            "Please sign this transaction in your wallet."
        );
        const Tx = {
          from: user?.attributes["ethAddress"],
          to: response.to,
          data: response.data,
          gasPrice: response.gasPrice,
          value: response.value,
        };
        console.groupCollapsed("PreApprovalTx");
        console.log("Tx:", Tx);
        console.groupEnd();
        web3.eth.sendTransaction(Tx, (err, hash) => {
          if (err) {
            setDialog("Swap was not pre-approved.");
            console.groupCollapsed("PreApprovalError");
            console.log(err);
            console.groupEnd();
            setPreApproved(false);
          } else {
            setDialog("Swap is now pre-approved.");
            console.groupCollapsed("PreApprovalHash");
            console.log(hash);
            console.groupEnd();
            setPreApproved(true);
          }
        });
      });
  };

  const handlePress = async () => {
    await preApproveTx();

    if (preApproved) {
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
          console.log("response:", response);
          console.groupEnd();
        });
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
