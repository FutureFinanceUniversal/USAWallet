import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useNetwork } from "../contexts/networkContext";

const serverURL = "https://deep-index.moralis.io/api/v2/";
const endPoint = "/erc20/transfers";
const MoralisAPIKey =
  "7YWJtHybS03C0z09QQjND12bIX7d9uR1n3DYApZ1PXVTYprU3MKrTXhLsQ0rNfAK";
const emptyList = [];

export const useTokenTransfers = (props) => {
  const { isAuthenticated, user, web3 } = useMoralis();
  const [Txs, setTxs] = useState(emptyList);
  const [isLoading, setIsLoading] = useState(false);
  const { networkName } = useNetwork();

  useEffect(() => {
    if (isAuthenticated) {
      const APIKeyHex = web3.utils.asciiToHex(MoralisAPIKey);
      const userAddress = user.attributes[networkName + "address"];
      const requestURL = serverURL + userAddress + endPoint + networkName;

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
