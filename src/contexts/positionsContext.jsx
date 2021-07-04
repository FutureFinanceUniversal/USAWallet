import React, { useContext } from "react";
import { usePositionArray } from "../hooks/usePositionArray";

const PositionsContext = React.createContext();

export function usePositions() {
  return useContext(PositionsContext);
}

export const PositionsProvider = (props) => {
  // "helper component"
  const positions = usePositionArray();

  console.groupCollapsed("PositionsProvider");
  // Bring back a list of all tokens the user has

  console.log("Providing positions array: ", positions);
  console.groupEnd();

  return (
    <PositionsContext.Provider value={positions}>
      {props.children}
    </PositionsContext.Provider>
  );
};

export default PositionsContext;
