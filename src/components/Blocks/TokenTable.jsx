import { Container, Text } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

export const TokenTable = () => {
  const { isAuthenticated, Moralis } = useMoralis();
  const [dataArray, setDataArray] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      Moralis.Web3.getAllERC20()
        .then((dataArray) => {
          setDataArray(dataArray);
        })
        .then(console.log);
    }
  }, [isAuthenticated, Moralis]);

  return (
    <Container>
      <Text>{dataArray.toString()}</Text>
    </Container>
  );
};
