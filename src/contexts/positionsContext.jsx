import React, { useContext, useState } from "react";
import { usePositionArray } from "../hooks/usePositionArray";

const PositionsContext = React.createContext();

export function usePositions() {
  return useContext(PositionsContext);
}

export const PositionsProvider = (props) => {
  const { positions, totalValue } = useState(usePositionArray());

  console.groupCollapsed("PositionsProvider");
  console.log("Providing positions array: ", positions);
  console.log("Providing total value: $" + totalValue);
  console.groupEnd();

  return (
    <PositionsContext.Provider value={{ positions, totalValue }}>
      {props.children}
    </PositionsContext.Provider>
  );
};

export default PositionsContext;
