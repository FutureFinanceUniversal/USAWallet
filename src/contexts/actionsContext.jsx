import React, { useState, useContext } from "react";

const ActionsContext = React.createContext();

export const useActions = () => useContext(ActionsContext);

export const ActionsProvider = (props) => {
  const [fromSymbol, setFromSymbol] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toSymbol, setToSymbol] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [txAmount, setTxAmount] = useState("");

  return (
    <ActionsContext.Provider
      value={{
        fromSymbol,
        setFromSymbol,
        fromAddress,
        setFromAddress,
        toSymbol,
        setToSymbol,
        toAddress,
        setToAddress,
        txAmount,
        setTxAmount,
      }}
    >
      {props.children}
    </ActionsContext.Provider>
  );
};

export default ActionsContext;
