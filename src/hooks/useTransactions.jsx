import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const emptyList = [];

export const useTransactions = (props) => {
  const { isAuthenticated, Moralis, user } = useMoralis();
  const address = user.attributes[props.chain + "Address"];
  const [Txs, setTxs] = useState(emptyList);
  const [isLoading, setIsLoading] = useState(true);

  console.groupCollapsed("useTransactions");
  console.log(
    isAuthenticated !== "0x"
      ? props.chain + "::" + address + " is authenticated."
      : "Unauthenticated."
  );

  useEffect(() => {
    if (isAuthenticated) {
      Moralis.Web3.getTransactions({ usePost: true }).then((userTrans) => {
        let newTxs = userTrans.map((Tx) => {
          const output = { ...Tx };
          switch (address) {
            case Tx.from_address:
              output.counterparty = Tx.to_address;
              output.amount = -1 * parseFloat(Tx.value);
              break;
            case Tx.to_address:
              output.counterparty = Tx.from_address;
              output.amount = 1 * parseFloat(Tx.value);
              break;
            case undefined:
              output.counterparty = undefined;
              output.amount = undefined;
              break;
            default:
              console.debug("Failed address: ", address);
              console.debug("Failed Tx.from_address:", Tx.from_address);
              console.debug("Failed Tx.to_address:", Tx.to_address);
              output.counterparty = null;
              output.amount = null;
              break;
          }
          return output;
        });
        setTxs(newTxs);
        setIsLoading(false);
      });
    } else {
      setTxs(emptyList);
      setIsLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Moralis.Web3, isAuthenticated]);

  console.log(isLoading ? "Transactions loading..." : "Returning Txs: ", Txs);
  console.groupEnd();

  return { Txs, isLoading };
};
