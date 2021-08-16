import { useEffect, useState } from "react";
import { useActions } from "../contexts/actionsContext";

const oneInchHead = "https://api.1inch.exchange/v3.0/1/quote?";

export const use1InchQuote = () => {
  const [quote, setQuote] = useState({});
  const { fromAddress, toAddress, txAmount } = useActions();

  useEffect(() => {
    fetch(
      oneInchHead +
        "fromTokenAddress=" +
        fromAddress +
        "&toTokenAddress=" +
        toAddress +
        "&amount=" +
        txAmount
    )
      .then((response) => response.json())
      .then((oneInchQuote) => {
        console.log("Recieved Quote:", oneInchQuote);
        setQuote(oneInchQuote);
      });
  });

  return quote;
};
