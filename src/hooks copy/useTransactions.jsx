import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const emptyList = [];

export const useTransactions = (props) => {
  const { isAuthenticated, Moralis } = useMoralis();
  const [transactions, setTransactions] = useState(emptyList);
  const [isLoading, setIsLoading] = useState(true);

  console.groupCollapsed("useTransactions");

  useEffect(() => {
    if (isAuthenticated) {
      console.debug("Calling getTransactions...");
      Moralis.Web3.getTransactions({ usePost: true }).then(
        (allTransactions) => {
          console.debug("All transaction data: ", allTransactions);
          setTransactions(allTransactions);
          setIsLoading(false);
        }
      );
    } else {
      setTransactions(emptyList);
      setIsLoading(true);
    }
  }, [Moralis.Web3, isAuthenticated]);

  console.debug("Returning transactions: ", transactions);
  console.groupEnd();

  return { transactions, isLoading };
};
