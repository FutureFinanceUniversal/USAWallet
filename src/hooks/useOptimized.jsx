import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import coinGeckoList from "../data/coinGeckoTokenList.json";
const emptyList = [];
const geckoHead =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";
const geckoTail = "&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export const usePositions = () => {
  const { isAuthenticated, Moralis } = useMoralis();
  const [positions, setPositions] = useState(emptyList);
  const [totalValue, setTotalValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // const [allPositions, setAllPositions] = useState(emptyList);

  useEffect(() => {
    if (isAuthenticated) {
      // Bring back a list of all tokens the user has
      console.log("Calling getAllERC20()...");
      Moralis.Web3.getAllERC20({ chain: "bsc" }).then((allPositions) => {
        console.log("All position data:", allPositions);
        const ids = allPositions
          .map((token) => coinGeckoList[token.symbol.toLowerCase()]?.id)
          .filter((id) => Boolean(id))
          .join(",");
        const url = `${geckoHead}?vs_currency=usd&ids=${ids}` + geckoTail;
        console.log(url);
        // setAllPositions(allPositions);
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
            const newList = allPositions.map((token) => {
              const output = { ...token };
              const tokenData = data[token.symbol.toUpperCase()];
              output.image = tokenData?.image;
              output.price = tokenData?.current_price;
              output.value = output.price ? token.balance * output.price : 0;
              runningTotal += output.value;
              //   output.valueString = [
              //     parseFloat(output.tokens).toPrecision(3) +
              //       " @ $" +
              //       parseFloat(tokenData?.current_price).toFixed(2) +
              //       "/" +
              //       output.symbol +
              //       " = $" +
              //       parseFloat(output.value).toFixed(2),
              //   ];
              return output;
            });
            setPositions(newList);
            setTotalValue(runningTotal);
            setIsLoading(false);
            // console.log("Returning positions: ", positions);
            // console.log("Returning isLoading:", isLoading);
            // console.log("totalValue:", totalValue);
          });
      });
    } else {
      // console.log("Unauthenticated.  Returning: ", emptyList);
      setPositions(emptyList);
      setIsLoading(true);
    }
  }, [Moralis.Web3, isAuthenticated]);

  return { positions, isLoading, totalValue };
};