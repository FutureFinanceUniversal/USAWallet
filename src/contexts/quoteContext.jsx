import React, { useState, useContext } from "react";

const QuoteContext = React.createContext();

export const useQuote = () => useContext(QuoteContext);

export const QuoteProvider = (props) => {
  const [quoteValid, setQuoteValid] = useState("false");
  const [fromToken, setFromToken] = useState({});
  const [fromTokenAmount, setFromTokenAmount] = useState(0);
  const [protocols, setProtocols] = useState([]);
  const [toToken, setToToken] = useState({});
  const [toTokenAmount, setToTokenAmount] = useState(0);
  const [estimatedGas, setEstimatedGas] = useState("");

  return (
    <QuoteContext.Provider
      value={{
        quoteValid,
        setQuoteValid,
        fromToken,
        setFromToken,
        fromTokenAmount,
        setFromTokenAmount,
        protocols,
        setProtocols,
        toToken,
        setToToken,
        toTokenAmount,
        setToTokenAmount,
        estimatedGas,
        setEstimatedGas,
      }}
    >
      {props.children}
    </QuoteContext.Provider>
  );
};

export default QuoteContext;
