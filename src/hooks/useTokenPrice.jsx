import { useEffect, useState } from "react";

const geckotail = "https://api.coingecko.com/api/v3/simple/price?ids=";

export const useTokenPrice = (props) => {
  const [tokenPrice, setTokenPrice] = useState({});

  console.groupCollapsed("useTokenPrice");

  useEffect(() => {
    let price = -1;
    let myObj = {};
    if (props.tokenName) {
      let geckoUrl = [
        geckotail + props.tokenName.toLowerCase() + "&vs_currencies=usd",
      ];
      console.debug("Fetching: " + geckoUrl);
      fetch(geckoUrl)
        .then((response) => response.json())
        .then((geckoData) => {
          console.debug(
            "geckoData about contract for '" + props.tokenName + "':"
          );
          console.debug(geckoData);
          myObj = JSON.parse(geckoData);
          price = myObj[props.tokenName].usd.toFixed(2);
          console.debug("Parsed price: $", price);
          setTokenPrice(price);
        })
        .error((err) => {
          console.error(err);
          setTokenPrice(-1);
        });
    }
  }, [props.tokenName]);

  console.log("Returning tokenPrice: ", tokenPrice);
  console.groupEnd();

  return tokenPrice;
};
