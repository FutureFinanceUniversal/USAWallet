import React, { useState, useEffect, useContext } from "react";
import { useMoralis } from "react-moralis";
import { usePositions } from "./positionsContext";
import { useTokenData } from "../hooks/useTokenData";

const PortfolioContext = React.createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = (props) => {
  const { isAuthenticated } = useMoralis();
  const positions = usePositions();
  const tokenData = useTokenData(
    positions.map((position) => {
      return position.name;
    })
  );
  const [portfolio, setPortfolio] = useState([]);
  const [totalBalance, setTotalBalance] = useState(-1);

  console.groupCollapsed("PortfolioProvider");
  console.debug("Received isAuthenticated: ", isAuthenticated);
  console.debug("Received positions: ", positions);
  console.debug("Received tokenData: ", tokenData);
  console.debug("Current portfolio: ", portfolio);
  console.debug("Current totalBalance: ", totalBalance);

  useEffect(() => {
    let dataRecord = {};
    let runningTotal = 0;
    console.debug("Traversing positions...");
    console.debug("...isAuthenticated: ", isAuthenticated);
    console.debug("...positions?.length: ", positions?.length);
    if (isAuthenticated && positions?.length) {
      positions.map((position) => {
        console.debug("...Position:", position);
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
        console.debug("...dataRecord:", dataRecord);
        return dataRecord;
      });
      setPortfolio(positions);
      setTotalBalance(runningTotal);
    } else {
      console.debug("Unauthenticated?");
      console.debug("positions.length: " + positions.length);
      setPortfolio({ totalValue: 0, positions: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, positions, tokenData]);

  console.debug("Providing portfolio: ", portfolio);
  console.groupEnd();

  return (
    <PortfolioContext.Provider value={{ portfolio, totalBalance }}>
      {props.children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContext;
