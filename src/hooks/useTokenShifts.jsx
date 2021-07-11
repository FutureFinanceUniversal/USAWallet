import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const emptyList = [];

export const useTokenShifts = (props) => {
  const { isAuthenticated, Moralis } = useMoralis();
  const [Txs, setTxs] = useState(emptyList);
  const [isLoading, setIsLoading] = useState(true);

  console.groupCollapsed("useTokenShifts");
  console.log("Loaded isAuthenticated: ", isAuthenticated);
  console.log("Received token name: ");

  useEffect(() => {
    if (isAuthenticated) {
      console.debug("Calling getTransactions...");
      Moralis.Web3.getTokenTransfers({ usePost: true }).then((userTrans) => {
        console.debug("All ERC20 transaction data: ", userTrans);
        setTxs(userTrans);
        setIsLoading(false);
      });
    } else {
      setTxs(emptyList);
      setIsLoading(true);
    }
  }, [Moralis, Moralis.Web3, isAuthenticated]);

  console.debug("Returning transactions: ", Txs);
  console.groupEnd();

  return { Txs, isLoading };
};
