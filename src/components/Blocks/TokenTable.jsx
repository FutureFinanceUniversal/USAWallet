import { Avatar, Flex, Text, VStack } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import coinGeckoList from "../../data/coinGeckoTokenList.json";

const coinGeckoApiUrl = "https://api.coingecko.com/api/v3/coins/markets";

export const TokenTable = () => {
  const { isAuthenticated, Moralis } = useMoralis();
  const [displayData, setDisplayData] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(-1);

  useEffect(
    () => {
      let portfolioData = [];
      let geckoUrl = "";

      if (isAuthenticated) {
        // Bring back a list of all tokens the user has
        Moralis.Web3.getAllERC20({ usePost: true })
          .then((dataArray) => {
            portfolioData = dataArray;
            if (dataArray?.length) {
              const ids = dataArray
                .map(
                  (tokenPosition) =>
                    coinGeckoList[tokenPosition.symbol.toLowerCase()]?.id
                )
                .filter((id) => Boolean(id))
                .join(",");
              // assemble url
              const url = `${coinGeckoApiUrl}?vs_currency=usd&ids=${ids}`;
              geckoUrl = url;
            }
          })
          .then(() => {
            fetch(geckoUrl, {
              method: "GET",
              mode: "cors",
              headers: { "Access-Control-Allow-Origin": true },
            })
              .then((response) => response.json())
              .then((geckoData) => {
                let totalBalance = 0;
                let shuffledData = portfolioData.map((token) => {
                  const output = { ...token };
                  const marketCard = geckoData.find(
                    (element) => element.symbol === token.symbol.toLowerCase()
                  );
                  if (marketCard != null) {
                    output.fulltokens = output.balance / 10 ** output.decimals;
                    output.value = output.fulltokens * marketCard.current_price;
                    totalBalance += output.value;
                    output.valueTxt = [
                      output.fulltokens.toPrecision(4) +
                        " @ $" +
                        marketCard.current_price.toFixed(2) +
                        "/" +
                        marketCard.symbol.toUpperCase() +
                        " = $" +
                        output.value.toFixed(2),
                    ];
                    output.image = marketCard.image;
                  } else {
                    output.value = 0;
                    output.valueTxt = "unknown token.";
                    output.image = "";
                  }
                  return output;
                });
                setDisplayData(shuffledData);
                setPortfolioValue(totalBalance);
              });
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated]
  );

  return (
    <VStack>
      <Text>Total Balance: ${portfolioValue.toFixed(2)}</Text>
      <Accordion allowToggle>
        {displayData.map((r) => (
          <AccordionItem key={r.name}>
            <AccordionButton>
              <Flex alignItems="left" justifyContent="space-between">
                <Avatar name={r.symbol} src={r.image} size="sm" />
                <Text ml={2}>{r.name}</Text>
                <Text ml={2}>{r.valueTxt}</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  );
};
