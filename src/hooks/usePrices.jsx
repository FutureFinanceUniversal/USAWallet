import { useEffect, useState } from "react";
import { usePositions } from "./usePositions";

const emptyList = [];
const geckoHead =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=";
const geckoTail = "&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export const usePrices = (props) => {
  const { positions, isLoading } = usePositions();
  const { waiting, setWaiting } = useState(true);
  const { portfolio, setPortfolio } = useState(emptyList);
  const { totalValue, setTotalValue } = useState(0);

  console.groupCollapsed("usePrice");
  console.log(
    isLoading ? "...waiting for Moralis load." : "Received position data: ",
    positions
  );

  useEffect(() => {
    if (!isLoading && portfolio) {
      setWaiting(true);
      let runningTotal = 0;
      let tempPortfolio = positions.map((position) => {
        const url = [geckoHead + position.name + geckoTail];
        fetch(url).then((marketData) => {
          position.image = marketData.image;
          position.price = marketData.current_price;
          position.value = position.tokens * position.price;
          runningTotal += position.value;
          position.valueString = [
            position.tokens +
              " @ " +
              position.price +
              "/" +
              position.symbol +
              "= $" +
              position.value,
          ];
          return position;
        });
        return position;
      });
      setPortfolio(tempPortfolio);
      setTotalValue(runningTotal);
      setWaiting(false);
    } else {
      setWaiting(true);
      setPortfolio(emptyList);
      setTotalValue(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions, isLoading]);

  console.log("Returning portfolio:", portfolio);
  console.log("Returning totalValue: $", totalValue);
  console.groupEnd();

  return { portfolio, waiting, totalValue };
};
