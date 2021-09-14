import { useEffect, useState } from "react";

const geckoHead = "https://api.coingecko.com/api/v3/coins/";
const geckoTail =
  "?localization=false&tickers=false&community_data=false&developer_data=true";

export const useTokenData = (props) => {
  const [tokenData, setTokenData] = useState({});

  console.groupCollapsed("useTokenData");
  console.log("Recieved props.tokenName:", props.tokenName);
  console.groupEnd();

  useEffect(() => {
    let record = {};
    if (props.tokenName) {
      let geckoUrl = [geckoHead + props.tokenName.toLowerCase() + geckoTail];
      fetch(geckoUrl, {
        method: "GET",
        mode: "cors",
        headers: { "Access-Control-Allow-Origin": true },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched:", data);
          // Convert to a 'dictionary' array of objects.
          const geckoData = {};
          data.forEach((d) => (geckoData[d.symbol.toUpperCase()] = d));
          console.log("geckoData for " + props.tokenName + ": ", geckoData);
          return geckoData;
        })
        .then((data) => {
          console.log("data for " + props.tokenName + ": ", data);
          const records = {
            key: data.symbol,
            name: data.name,
            symbol: data.symbol,
            address: data.contract_address,
            description: data.description.en,
            links: data.links,
            image: data.image,
            price: data.price.usd,
          };
          return records;
        });
      setTokenData(record);
    }
  }, [props.tokenName]);

  return tokenData;
};
