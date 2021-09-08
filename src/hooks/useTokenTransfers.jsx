import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const serverURL = "https://deep-index.moralis.io/api/v2/";
const endPoint = "/erc20/transfers";
const APIKey =
  "7YWJtHybS03C0z09QQjND12bIX7d9uR1n3DYApZ1PXVTYprU3MKrTXhLsQ0rNfAK";
const emptyList = [];

export const useTokenTransfers = (props) => {
  const { isAuthenticated, user, web3 } = useMoralis();
  const [Txs, setTxs] = useState(emptyList);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const APIKeyHex = web3.utils.asciiToHex(APIKey);
      const chain = props.chain ? "?chain=" + props.chain : "?chain=eth";
      const userAddress = user.attributes[chain + "address"];
      const requestURL = serverURL + userAddress + endPoint + chain;

      console.groupCollapsed("useTokenTransfers");
      console.log("requestURL:", requestURL);

      setIsLoading(true);

      fetch(requestURL, {
        method: "GET",
        headers: {
          "X-API-Key": APIKeyHex,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("response:", response);
          console.groupEnd();
          setTxs(response.result);
          setIsLoading(false);
          return response.result;
        });
    } else {
      setTxs(emptyList);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, props.chain]);

  console.debug("Returning transactions: ", Txs);
  console.groupEnd();

  return { Txs, isLoading };
};
