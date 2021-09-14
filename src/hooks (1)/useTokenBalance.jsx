import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

export const useTokenBalance = (props) => {
  const { isAuthenticated, Moralis } = useMoralis();
  const [balance, setBalance] = useState(-1);

  console.groupCollapsed("useTokenBalance");

  useEffect(() => {
    if (isAuthenticated) {
      console.debug("Calling getERC20()");
      Moralis.Web3.getERC20({ symbol: props.symbol, usePost: true })
        .then((balanceObject) => {
          setBalance(balanceObject.balance);
        })
        .error((err) => {
          console.error(err);
        });
    } else {
      console.debug("Unauthenticated.");
      setBalance(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, props.symbol]);

  console.debug("Returning balance:", balance);
  console.groupEnd();

  return balance;
};
