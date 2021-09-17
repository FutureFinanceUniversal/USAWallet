import { useEffect, useState } from "react";
import { useNetwork } from "../contexts/networkContext";

export const use1InchTokenList = (props) => {
  const [tokenList, setTokenList] = useState({});
  const { networkId } = useNetwork();
  const oneInchTail =
    "https://api.1inch.exchange/v3.0/" + networkId + "/tokens";

  console.groupCollapsed("use1InchTokenList");

  useEffect(() => {
    let myObj = {};
    fetch(oneInchTail, {
      method: "GET",
      mode: "cors",
      headers: { "Access-Control-Allow-Origin": true },
    })
      .then((response) => response.json())
      .then((oneInchData) => {
        myObj = JSON.parse(oneInchData);
        console.debug("Received oneInchData: ", myObj);
        if (props.tokenSymbol) {
          myObj = myObj.tokens.find(
            (token) =>
              token.symbol.toUpperCase() === props.tokenSymbol.toUpperCase()
          );
          console.debug(myObj.length + " token symbol matches found.");
        } else {
          myObj = myObj.tokens;
        }
        setTokenList({ myObj });
      })
      .error((err) => {
        console.error(err);
      });
  }, [props.tokenSymbol]);

  console.debug("Returning tokenData:", tokenList);
  console.groupEnd();

  return tokenList;
};
