import { Text } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

export const Balance = () => {
  const { isAuthenticated, Moralis } = useMoralis();
  const [balance, setBalance] = useState(-1);

  useEffect(() => {
    if (isAuthenticated) {
      Moralis.Web3.getERC20().then((balanceObject) => {
        setBalance(balanceObject.balance);
      });
    }
  }, [isAuthenticated, Moralis, setBalance]);

  return <Text>Balance: {balance} Wei</Text>;
};
