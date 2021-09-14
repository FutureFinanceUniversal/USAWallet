import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Avatar,
  Box,
} from "@chakra-ui/react";
import coinGeckoList from "../../data/coinGeckoTokenList.json";
import { TransactionList } from "./TransactionList";

const Moralis = require("moralis");
const appId = "lXHLCGVzsFCcxsZ1CC53kzJtHO2CCYQr3PcZ96iT";
const serverUrl = "https://pbpumvfxcvqq.moralis.io:2053/server";

const coinGeckoApiUrl = "https://api.coingecko.com/api/v3/coins/markets";

Moralis.initialize(appId, serverUrl);

class TokenTable extends React.Component {
  constructor(props) {
    console.log("Constructing portfolio table...");
    super(props);
    this.pullMoralisData = this.pullMoralisData.bind(this);
    this.pullCoinGeckoData = this.pullCoinGeckoData.bind(this);
    this.state = {
      tokenList: [],
      marketData: [],
      displayList: [],
    };
  }

  pullMoralisData() {
    if (Moralis.isAuthenticated) {
      console.log("Pulling balance data...");
      Moralis.Web3.getaAllERC20({ usePost: true }).then((tokenArray) => {
        this.setState({ tokenList: tokenArray });
      });
    } else {
      console.log("Moralis user is unauthenticated.");
    }
  }

  prepareTokenList() {
    if (this.tokenList?.length) {
      console.log("Filtering token list...");
      const ids = this.tokenList
        .map((token) => coinGeckoList[token.symbol.toLowerCase()]?.id)
        .filter((id) => Boolean(id))
        .join(",");
      return ids;
    } else {
      console.log("Sent a blank token list to filter.");
      return null;
    }
  }

  pullCoinGeckoData() {
    const url = `${coinGeckoApiUrl}?vs_currency=usd&ids=${this.prepareTokenList}`;
    console.log("Fetching market data from:");
    console.log(url);
    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: { "Access-Control-Allow-Origin": true },
    })
      .then((response) => response.json())
      .then((data) => {
        // pivot into a dictionary
        console.log("Fetched data:", data);
        const marketData = {};
        data.forEach((d) => (marketData[d.symbol.toUpperCase()] = d));
        console.log("marketData:", marketData);
        return marketData;
      });
  }

  render() {
    console.log(this.state);
    return (
      <Accordion allowToggle>
        {this.displayList.map((token) => {
          return (
            <AccordionItem>
              <AccordionButton>
                <Avatar size="md" name={token.symbol} src="blah" />
                <Box flex="1" textAlign="left">
                  {token.name}
                </Box>
                <Box flex="1" textAlign="left">
                  {token.balance / 10 ** token.decimals} @ {token.priceUSD}{" "}
                  {token.symbol}/USD = ${token.value}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <TransactionList />
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  }
}

export default TokenTable;
