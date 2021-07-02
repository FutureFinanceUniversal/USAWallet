import { useEffect, useState } from "react";

const geckotail = "https://api.coingecko.com/api/v3/coins/";

export const useTokenData = (props) => {
  const [tokenData, setTokenData] = useState({});

  console.groupCollapsed("useTokenData");

  useEffect(() => {
    let myObj = {};
    if (props.tokenName) {
      let geckoUrl = [geckotail + props.tokenName.toLowerCase()];
      fetch(geckoUrl, {
        method: "GET",
        mode: "cors",
        headers: { "Access-Control-Allow-Origin": true },
      })
        .then((response) => response.json())
        .then((geckoData) => {
          console.debug(
            "geckoData about contract for '" + props.tokenName + "':"
          );
          console.debug(geckoData);
          myObj = JSON.parse(geckoData);
          setTokenData({
            name: myObj.name,
            symbol: myObj.symbol,
            address: myObj.contract_address,
            description: myObj.description.en,
            links: myObj.links,
            image: myObj.image,
            price: myObj.price.usd,
          });
        })
        .error((err) => {
          console.error(err);
        });
    } else {
      console.debug("No props.tokenName given.");
    }
  }, [props.tokenName]);

  console.debug("Returning tokenData:", tokenData);
  console.groupEnd();

  return tokenData;
};
