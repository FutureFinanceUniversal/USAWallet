import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const useTransactions = (props) => {
  const { isAuthenticated, Moralis } = useMoralis();
  const { transactions, setTransactions } = useState();

  console.groupCollapsed("useTransactions");

  useEffect(() => {
    if (isAuthenticated) {
      console.debug("Calling getTransactions...");
      Moralis.Web3.getTransactions({ usePost: true })
        .then((allTransactions) => {
          console.debug("All transaction data: ", allTransactions);
          setTransactions(allTransactions);
        })
        .error((err) => {
          console.error(err);
        });
    } else {
      console.debug("Unauthenticated.");
      setTransactions({});
    }
  });

  console.debug("Returning transactions: ", transactions);
  console.groupEnd();

  return transactions;
};
