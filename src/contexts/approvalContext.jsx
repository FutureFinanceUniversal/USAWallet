import React, { useState, useContext } from "react";

const ApprovalContext = React.createContext();

export const useApproval = () => useContext(ApprovalContext);

export const ApprovalProvider = (props) => {
  const [isApproved, setIsApproved] = useState(false);

  return (
    <ApprovalContext.Provider value={{ isApproved, setIsApproved }}>
      {props.children}
    </ApprovalContext.Provider>
  );
};

export default ApprovalContext;
