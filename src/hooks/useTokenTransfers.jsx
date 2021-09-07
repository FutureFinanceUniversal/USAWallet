import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const emptyList = [];

export const useTokenTransfers = (props) => {
  const { isAuthenticated, Moralis } = useMoralis();
  const [Txs, setTxs] = useState(emptyList);
  const [isLoading, setIsLoading] = useState(1);

  console.groupCollapsed("useTokenShifts");
  console.log("Loaded isAuthenticated: ", isAuthenticated);
  console.log("Moralis:", Moralis);
  console.log("chain: ", props.chain);

  useEffect(() => {
    if (isAuthenticated) {
      console.debug("Calling getTransactions...");
      Moralis.Web3API.account
        .getTokenTransfers({
          usePost: true,
          chain: props.chain,
        })
        .then((userTrans) => {
          console.debug("All ERC20 transaction data: ", userTrans);
          setTxs(userTrans);
          setIsLoading(0);
        });
    } else {
      setTxs(emptyList);
      setIsLoading(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, props.chain]);

  console.debug("Returning transactions: ", Txs);
  console.groupEnd();

  return { Txs, isLoading };
};
