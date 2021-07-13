import React, { useState, useContext } from "react";

const ExpertsContext = React.createContext();

export const useExperts = () => useContext(ExpertsContext);

export const ExpertsProvider = (props) => {
  const [expertsOn, toggleExperts] = useState(true);
  const [actionMode, setActionMode] = useState("UncleSam");
  const [dialog, setDialog] = useState(
    "Welcome to USA Wallet.  Simple, Safe, Secure."
  );

  return (
    <ExpertsContext.Provider
      value={{
        expertsOn,
        toggleExperts,
        actionMode,
        setActionMode,
        dialog,
        setDialog,
      }}
    >
      {props.children}
    </ExpertsContext.Provider>
  );
};

export default ExpertsContext;
