import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const usePositionArray = (props) => {
  const { isAuthenticated, Moralis } = useMoralis();
  const [positions, setPositions] = useState([]);

  console.groupCollapsed("usePositionArray");
  console.log("Recieved isAuthenticated: ", isAuthenticated);

  // Bring back a list of all tokens the user has
  useEffect(() => {
    let newRecord = {};

    if (isAuthenticated) {
      console.log("Calling getAllERC20()...");
      Moralis.Web3.getAllERC20({ usePost: true }).then((allPositions) => {
        console.log("All position data:", allPositions);
        setPositions(
          allPositions.map((record) => {
            newRecord = record;
            newRecord.tokens = newRecord.balance / 10 ** newRecord.decimals;
            console.log("newRecord:", newRecord);
            return newRecord;
          })
        );
      });
    } else {
      console.debug("Unauthenticated user.");
      setPositions({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (!positions) {
    return [];
  } else {
    return positions;
  }
};
