import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useNetwork } from "../contexts/networkContext";
import coinGeckoList from "../data/coinGeckoTokenList.json";
const emptyList = [];
const geckoHead =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";
const geckoTail = "&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export const usePositions = () => {
  const { isAuthenticated, Moralis } = useMoralis();
  const { networkName } = useNetwork();
  const [positions, setPositions] = useState(emptyList);
  const [totalValue, setTotalValue] = useState(0);
  const [isLoading, setIsLoading] = useState(1);
  // const [allPositions, setAllPositions] = useState(emptyList);

  useEffect(() => {
    if (isAuthenticated) {
      // Bring back a list of all tokens the user has
      Moralis.Web3.getAllERC20({ usePost: true, chain: networkName }).then(
        (allPositions) => {
          const ids = allPositions
            .map((token) =>
              token.name.toLowerCase() === "ether"
                ? coinGeckoList["ethereum"].id
                : coinGeckoList[token.name.toLowerCase()]?.id
            )
            .filter((id) => Boolean(id))
            .join(",");
          const url = `${geckoHead}?vs_currency=usd&ids=${ids}` + geckoTail;
          // Call CoinGecko API:
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              // Convert to a 'dictionary' array of objects.
              const marketData = {};
              data.forEach((d) => (marketData[d.symbol.toUpperCase()] = d));
              return marketData;
            })
            .then((data) => {
              let runningTotal = 0;
              const newList = allPositions.map((token) => {
                // Merge position data with market data and augment.
                const output = { ...token };
                const tokenData = data[token.symbol.toUpperCase()];
                output.image = tokenData?.image;
                output.price = tokenData?.current_price;
                output.tokens = token.balance
                  ? token.balance / 10 ** token.decimals
                  : 0;
                output.value = output.price ? output.tokens * output.price : 0;
                runningTotal += output.value;
                output.valueString = [
                  parseFloat(output?.tokens).toPrecision(3) +
                    " @ $" +
                    parseFloat(tokenData?.current_price).toFixed(2) +
                    "/" +
                    output?.symbol.toUpperCase() +
                    " = $" +
                    parseFloat(output?.value).toFixed(2),
                ];
                return output;
              });
              // Done.  Report back to states.
              setPositions(newList);
              setTotalValue(runningTotal);
              setIsLoading(0);
            });
        }
      );
    } else {
      // No authentication.  Report blanks.
      setPositions(emptyList);
      setIsLoading(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Moralis.Web3, isAuthenticated]);

  return { positions, isLoading, totalValue };
};
