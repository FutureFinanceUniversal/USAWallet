import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useNetwork } from "../contexts/networkContext";

const emptyList = [];

export const useTransactions = (props) => {
  const { isAuthenticated, Moralis, user } = useMoralis();
  const { networkName } = useNetwork();
  const address = user.attributes[props.chain + "Address"];
  const [Txs, setTxs] = useState(emptyList);
  const [isLoading, setIsLoading] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      Moralis.Web3API.account
        .getTransactions({ usePost: true, chain: networkName })
        .then((userTrans) => {
          console.log("userTrans:", userTrans);
          let newTxs = userTrans.result.map((Tx) => {
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
          setIsLoading(0);
        });
    } else {
      setTxs(emptyList);
      setIsLoading(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Moralis.Web3, isAuthenticated]);

  return { Txs, isLoading };
};
