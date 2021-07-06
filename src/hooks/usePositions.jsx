import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import coinGeckoList from "../data/coinGeckoTokenList.json";
const emptyList = [];
const geckoHead =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";
const geckoTail = "&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export const usePositions = () => {
  const { Moralis } = useMoralis();
  const [totalValue, setTotalValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [positions, setPositions] = useState({});

  console.groupCollapsed("usePositions");
  console.log("calling Moralis.web3.getAllERC20()...");
  const tokens = Moralis.Web3.getAllERC20().then((response) => {
    console.log("Receved Moralis response: ", response);
  });

  useEffect(() => {
    console.log("Triggered on change to token data:", tokens);
    if (tokens?.length) {
      console.log("Augmenting with price...");
      // Bring back a list of all tokens the user has
      const ids = tokens
        .map((token) => coinGeckoList[token.symbol.toLowerCase()]?.id)
        .filter((id) => Boolean(id))
        .join(",");
      const url = `${geckoHead}${ids}` + geckoTail;
      console.log("fetching from: ", url);

      // Call CoinGecko API:
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const marketData = {};
          data.forEach((d) => (marketData[d.symbol.toUpperCase()] = d));
          return marketData;
        })
        .then((data) => {
          let runningTotal = 0;
          const newList = tokens.map((token) => {
            const output = { ...token };
            const tokenData = data[token.symbol.toUpperCase()];
            output.price = tokenData?.current_price;
            output.image = tokenData?.image;
            output.value = output.price ? token.balance * output.price : 0;
            runningTotal += output.value;
            output.valueString = [
              parseFloat(output.tokens).toPrecision(3) +
                " @ $" +
                parseFloat(tokenData?.current_price).toFixed(2) +
                "/" +
                output.symbol.toUpperCase() +
                " = $" +
                parseFloat(output.value).toFixed(2),
            ];
            return output;
          });
          setPositions(newList);
          setTotalValue(runningTotal);
        });
    } else {
      console.log("Token list blank.  Skipping CoinGecko call. ");
      setPositions(emptyList);
      setTotalValue(0);
      setIsLoading(true);
    }
    setIsLoading(false);
  }, [tokens]);

  console.log("Returning positions: ", positions);
  console.log("Returning isLoading:", isLoading);
  console.log("totalValue:", totalValue);

  return { positions, isLoading, totalValue };
};
