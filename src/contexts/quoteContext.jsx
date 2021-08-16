import React, { useState, useContext } from "react";

const QuoteContext = React.createContext();

export const useQuote = () => useContext(QuoteContext);

export const QuoteProvider = (props) => {
  const [quote, setQuote] = useState("");

  return (
    <QuoteContext.Provider value={{ quote, setQuote }}>
      {props.children}
    </QuoteContext.Provider>
  );
};

export default QuoteContext;
