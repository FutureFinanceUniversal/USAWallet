import React, { useState, useContext } from "react";

const TokenDataContext = React.createContext();

export const useTokenData = () => useContext(TokenDataContext);

export const TokenDataProvider = (props) => {
  const [tokenData] = useState(useTokenData(props.tokenName));

  console.groupCollapsed("TokenDataProvider");
  console.log("Providing" + props.tokenName + " tokenData array: ", tokenData);
  console.groupEnd();

  return (
    <TokenDataContext.Provider value={tokenData}>
      {props.children}
    </TokenDataContext.Provider>
  );
};

export default TokenDataContext;
