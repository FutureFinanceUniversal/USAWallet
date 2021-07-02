import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const usePositionArray = (props) => {
  const { isAuthenticated, Moralis } = useMoralis();
  const { positions, setPositions } = useState();

  console.groupCollapsed("usePositionArray");
  // Bring back a list of all tokens the user has
  useEffect(() => {
    let newRecord = {};
    if (isAuthenticated) {
      console.debug("Calling getAllERC20()...");
      Moralis.Web3.getAllERC20({ usePost: true })
        .then((allPositions) => {
          console.debug("All position data:", allPositions);
          setPositions(
            allPositions.map((record) => {
              newRecord = record;
              newRecord.tokens = newRecord.balance / 10 ** newRecord.decimals;
              console.debug("newRecord:", newRecord);
              return newRecord;
            })
          );
        })
        .error((error) => {
          console.error(error);
        });
    } else {
      console.debug("Unauthenticated user.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  console.debug("Returning positions array: ", positions);
  console.groupEnd();

  return positions;
};
