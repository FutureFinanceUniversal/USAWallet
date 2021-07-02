import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { usePositionArray } from "./usePositionArray";
import { useTokenData } from "./useTokenData";

export const usePortfolio = (props) => {
  const { isAuthenticated } = useMoralis();
  const { positions } = usePositionArray();
  const { tokenData } = useTokenData(
    positions.map((position) => {
      return position.name;
    })
  );
  const { portfolio, setPortfolio } = useState([]);

  console.groupCollapsed("usePortfolio");

  useEffect(() => {
    let dataRecord = {};
    let runningTotal = 0;
    console.debug("Traversing positions...");
    if (isAuthenticated && positions?.length) {
      positions.map((position) => {
        console.debug("Position:", position);
        dataRecord = tokenData.find(
          (token) => token.symbol === dataRecord.symbol
        );
        dataRecord.balance = position.balance;
        dataRecord.value = dataRecord.tokens * dataRecord.price;
        dataRecord.valueString = [
          dataRecord.balance.toPrecision(3) +
            " @ $" +
            dataRecord.price.toFixed(2) +
            "/" +
            dataRecord.symbol.toUpperCase() +
            " = $" +
            dataRecord.value.toFixed(2),
        ];
        runningTotal += dataRecord.value;
        console.debug("dataRecord:", dataRecord);
        return dataRecord;
      });
      setPortfolio({ totalValue: runningTotal, positions: positions });
    } else {
      console.debug("Unauthenticated?");
      console.debug("positions.length: " + positions.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, positions, tokenData]);

  console.debug("Returning portfolio: ", portfolio);
  console.groupEnd();

  return portfolio;
};
