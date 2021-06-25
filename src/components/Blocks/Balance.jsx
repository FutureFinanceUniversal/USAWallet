import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export const Balance = () => {
  const { authenticate, logout, isAuthenticated, Moralis } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      Moralis.Web3.getERC20().then(console.log);
    }
  }, [isAuthenticated, Moralis]);

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => authenticate()}>Login</button>
      )}
      {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
    </div>
  );
};
