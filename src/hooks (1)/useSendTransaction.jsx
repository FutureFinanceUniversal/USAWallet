import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useExperts } from "../contexts/expertsContext";

export const useSendTransaction = (props) => {
  const { isAuthenticated, Moralis, user } = useMoralis();
  const { setDialog } = useExperts();

  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [transactionReceipt, setTransactionReceipt] = useState({});
  const [confirmationNumber, setConfirmationNumber] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      const userAddress = user.attributes[props.chain + "address"];
      Moralis.Web3.enable().then((web3) => {
        setIsLoading(true);
        web3.eth
          .sendTransaction({
            data: props.data,
            gasPrice: props.gasPrice,
            to: props.to,
            value: props.value,
            from: userAddress,
          })
          .on("transactionHash", (hash) => {
            setDialog(
              "Received" +
                props.description +
                " hash. " +
                "Waiting for receipt..."
            );
            console.groupCollapsed("useSendTransaction::transactionHash()");
            console.log("transactionHash:", transactionHash);
            console.groupEnd();
            setTransactionHash(hash);
          })
          .on("receipt", (receipt) => {
            setDialog(
              "Received " +
                props.description +
                " receipt.  " +
                "Waiting for confirmations..."
            );
            console.groupCollapsed("useSendTransaction::transactionHash();");
            console.log("receipt:", receipt);
            console.groupEnd();
            setTransactionReceipt(receipt);
          })
          .on("confirmation", (confirmnNumber, receipt) => {
            let confirmMessage =
              "Received " + confirmationNumber + 1 + (confirmationNumber === 0)
                ? " confirmation for " + props.description + "."
                : " confirmations for " + props.description + ".";
            setDialog(confirmMessage);
            console.groupCollapsed("useSendTransaction::confirmation");
            console.log(confirmMessage);
            console.groupEnd();
            setConfirmationNumber(confirmationNumber + 1);
          })
          .on("error", (error, receipt) => {
            // if a out-of-gas error, the second parameter is the receipt.
            let oops = receipt
              ? props.description + " ran out of gas."
              : error + " went wrong with " + props.description + ".";
            setDialog(oops);
            console.groupCollapsed("useSendTransaction::error");
            console.log(oops);
            console.log("receipt:", receipt);
            console.groupEnd();
          });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isAuthenticated,
    props.chain,
    props.data,
    props.description,
    props.gasPrice,
    props.to,
    props.value,
    user.attributes,
  ]);

  return { isLoading, transactionHash, transactionReceipt, confirmationNumber };
};
