import { useEffect, useState } from "react";

const oneInchTail = "https://api.coingecko.com/api/v3/coins/";

export const useSwap = (props) => {
  const { transaction, setTransaction } = useState({});
  console.groupCollapsed("useSwap");

  console.groupEnd();
  useEffect(() => {
    if (!props.fromSymbol) {
      console.error("Received no fromSymbol.");
      return;
    } else {
      console.debug("Received fromSymbol: ", props.fromSymbol);
      if (!props.toSymbol) {
        console.error("Received no toSymbol");
        return;
      } else {
        console.debug("Received toSymbol: ", props.toSymbol);
        if (!props.amount) {
          console.error("Received no swap amount.");
          return;
        } else {
          console.debug("Received swapAmount: ", props.swapAmount);
          // do something 1-inchy here.
          return;
        }
      }
    }
  });

  console.groupEnd();
  return transaction;
};
