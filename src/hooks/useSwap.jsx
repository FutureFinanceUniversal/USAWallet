import { Avatar, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { use1InchTokenList } from "./use1InchTokenList";
import { useNetwork } from "../contexts/networkContext";

export const useSwap = (props) => {
  const { networkId } = useNetwork();
  const [transaction, setTransaction] = useState({});
  const { fromTokenData } = use1InchTokenList({
    tokenSymbol: props.fromSymbol,
  });
  const { toTokenData } = use1InchTokenList({ tokenSymbol: props.toSymbol });
  const oneInchEndpoint =
    "https://api.1inch.exchange/v3.0/" + networkId + "/quote?";

  console.groupCollapsed("useSwap");

  console.groupEnd();
  useEffect(() => {
    if (!props.fromSymbol) {
      console.error("Received no fromSymbol.");
      return;
    } else {
      console.debug("Received fromSymbol: ", props.fromSymbol);
      if (!props.toSymbol) {
        console.error("Received no toSymbol");
        return;
      } else {
        console.debug("Received toSymbol: ", props.toSymbol);
        if (!props.amount) {
          console.error("Received no swap amount.");
          return;
        } else {
          console.debug("Received swapAmount: ", props.swapAmount);
          let oneInchUrl = [
            oneInchEndpoint +
              "fromTokenAddress=" +
              fromTokenData.address +
              "&toTokenAddress=" +
              toTokenData.address +
              "&amount=" +
              props.amount,
          ];
          fetch(oneInchUrl, {
            method: "GET",
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": true },
          })
            .then((response) => response.json())
            .then((oneInchData) => {
              oneInchData = JSON.parse(oneInchData);
              console.debug("Received oneInchData: ", oneInchData);
              setTransaction(
                <HStack>
                  <Avatar src={oneInchData.fromToken.logoURI} size="md" />
                  <Text>
                    {(
                      oneInchData.fromTokenAmount /
                      10 ** oneInchData.fromToken.decimals
                    ).toPrecision(3)}
                    {oneInchData.fromToken.symbol}
                    buys
                  </Text>
                  <Avatar src={oneInchData.toToken.logoURI} size="md" />
                  <Text>
                    {oneInchData.toTokenAmount /
                      10 ** oneInchData.fromToken.decimals}
                    .toPrecision(3)
                    {oneInchData.toToken.symbol}
                    for {oneInchData.estimatedGas} gas.
                  </Text>
                </HStack>
              );
            })
            .error((err) => {
              console.error(err);
            });
          return;
        }
      }
    }
  });

  console.groupEnd();
  return transaction;
};
