import React, { useState, useContext } from "react";

const NetworkContext = React.createContext();

export const useNetwork = () => useContext(NetworkContext);

export const NetworkProvider = (props) => {
  const [networkId, setNetworkId] = useState(1);
  const [networkName, setNetworkName] = useState("eth");

  return (
    <NetworkContext.Provider
      value={{
        networkId,
        setNetworkId,
        networkName,
        setNetworkName,
      }}
    >
      {props.children}
    </NetworkContext.Provider>
  );
};

export default NetworkContext;
