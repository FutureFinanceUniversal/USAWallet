import React, { useState, useContext } from "react";

const ExpertsContext = React.createContext();

export const useExperts = () => useContext(ExpertsContext);

export const ExpertsProvider = (props) => {
  const [expertsOn, toggleExperts] = useState(true);

  return (
    <ExpertsContext.Provider value={{ expertsOn, toggleExperts }}>
      {props.children}
    </ExpertsContext.Provider>
  );
};

export default ExpertsContext;
