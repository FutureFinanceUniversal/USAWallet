import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const emptyList = [];

export const usePositions = () => {
  const { isAuthenticated, Moralis } = useMoralis();
  const [positions, setPositions] = useState(emptyList);
  const [isLoading, setIsLoading] = useState(true);

  console.groupCollapsed("usePositionArray");
  console.log("Recieved isAuthenticated: ", isAuthenticated);

  useEffect(() => {
    let newRecord = {};
    let newSet = {};

    if (isAuthenticated) {
      // Bring back a list of all tokens the user has
      console.log("Calling getAllERC20()...");
      Moralis.Web3.getAllERC20({ usePost: true }).then((allPositions) => {
        console.log("All position data:", allPositions);
        newSet = allPositions.map((record) => {
          // Copy Moralis.io position object data.
          newRecord = record;
          // Calculate tokens from balance and decimals.
          newRecord.tokens = newRecord.balance / 10 ** newRecord.decimals;
          // Fix 'ether' -> 'ethereum'
          newRecord.name = newRecord.name.toLowerCase();
          newRecord.name =
            newRecord.name === "ether" ? "ethereum" : newRecord.name;
          return newRecord;
        });
        setPositions(newSet);
        setIsLoading(false);
      });
    } else {
      console.log("Unauthenticated.  Returning: ", emptyList);
      setPositions(emptyList);
    }
  }, [Moralis.Web3, isAuthenticated]);
  console.log("Returning positions: ", positions);
  console.log("Returning isLoading:", isLoading);
  console.groupEnd();

  return { positions, isLoading };
};
