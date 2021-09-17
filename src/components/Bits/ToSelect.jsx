import { FormControl, Flex, FormErrorMessage, Select } from "@chakra-ui/react";
import { useActions } from "../../contexts/actionsContext";
import { useExperts } from "../../contexts/expertsContext";
import { useQuote } from "../../contexts/quoteContext";

const offeringData = [
  {
    networkId: 1,
    name: "Polkalokr",
    symbol: "lkr",
    address: "0x80ce3027a70e0a928d9268994e9b85d03bd4cdcf",
    description: "Customisable escrow for token economies",
    image:
      "https://assets.coingecko.com/coins/images/14692/thumb/coingeckoLogo.png?1617809622",
  },
  {
    networkId: 137,
    name: "ChainLink",
    symbol: "link",
    address: "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
    description: "Decentralized oracle network",
    image:
      "https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png?1547034700",
  },
  {
    networkId: 137,
    name: "AAVE",
    symbol: "aave",
    address: "0xd6df932a45c0f255f85145f286ea0b292b21c90b",
    description: "Decentralized money market",
    image:
      "https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110",
  },
  {
    networkId: 137,
    name: "Uniswap",
    symbol: "uni",
    address: "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
    description: "Decentralized Exchange",
    image:
      "https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604",
  },
  {
    networkId: 137,
    name: "USDC",
    symbol: "usdc",
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    description: "USD-backed stable coin.",
    image:
      "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
  },
  {
    networkId: 137,
    name: "renBTC",
    symbol: "rbtc",
    address: "0xdbf31df14b66535af65aac99c32e9ea844e14501",
    description: "BTC-backed stable coin",
    image:
      "https://assets.coingecko.com/coins/images/11370/thumb/Bitcoin.jpg?1628072791",
  },
  {
    networkId: 137,
    name: "TrustSwap",
    symbol: "swap",
    address: "0x3809dcdd5dde24b37abe64a5a339784c3323c44f",
    description: "Decentralized exchange.",
    image:
      "https://assets.coingecko.com/coins/images/11795/thumb/Untitled_design-removebg-preview.png?1626926355",
  },
  {
    networkId: 137,
    name: "SushiSwap",
    symbol: "sushi",
    address: "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
    description: "Decentralized exchange.",
    image:
      "https://assets.coingecko.com/coins/images/12271/thumb/512x512_Logo_no_chop.png?1606986688",
  },
  {
    networkId: 137,
    name: "QuickSwap",
    symbol: "quick",
    address: "0x831753dd7087cac61ab5644b308642cc1c33dc13",
    description: "Decentralized exchange",
    image:
      "https://assets.coingecko.com/coins/images/13970/thumb/1_pOU6pBMEmiL-ZJVb0CYRjQ.png?1613386659",
  },
  {
    networkId: 137,
    name: "Balancer",
    symbol: "bal",
    address: "0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
    description: "Decentralized exchange",
    image:
      "https://assets.coingecko.com/coins/images/11683/thumb/Balancer.png?1592792958",
  },
  {
    networkId: 137,
    name: "DecentraLand",
    symbol: "mana",
    address: "0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
    description: "Crypto VR platform.",
    image:
      "https://assets.coingecko.com/coins/images/878/thumb/decentraland-mana.png?1550108745",
  },
  {
    networkId: 137,
    name: "SuperFarm",
    symbol: "super",
    address: "0xa1428174f516f527fafdd146b883bb4428682737",
    description: "NFT Platform",
    image:
      "https://assets.coingecko.com/coins/images/14040/thumb/6YPdWn6.png?1613975899",
  },
  {
    networkId: 137,
    name: "Aavegotchi",
    symbol: "ghst",
    address: "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
    description: "NFT Universe governance/currency",
    image:
      "https://assets.coingecko.com/coins/images/12467/thumb/ghst_200.png?1600750321",
  },
  {
    networkId: 137,
    name: "The Graph",
    symbol: "grt",
    address: "0x5fe2b58c013d7601147dcdd68c143a77499f5531",
    description: "Decentralized indexing token.",
    image:
      "https://assets.coingecko.com/coins/images/13397/thumb/Graph_Token.png?1608145566",
  },
  {
    networkId: 137,
    name: "Synthetix Network Token",
    symbol: "snx",
    address: "0x50b728d8d964fd00c2d0aad81718b71311fef68a",
    description: "Synthetic stablecoin network token.",
    image:
      "https://assets.coingecko.com/coins/images/3406/thumb/SNX.png?1598631139",
  },
  {
    networkId: 137,
    name: "CyberFi",
    symbol: "cfi",
    address: "0xecf8f2fa183b1c4d2a269bf98a54fce86c812d3e",
    description: "DeFi Automation",
    image:
      "https://assets.coingecko.com/coins/images/13112/thumb/cyberfi_logo.jpeg?1605283367",
  },
  {
    networkId: 137,
    name: "PolyStarter",
    symbol: "polr",
    address: "0x029c2bf9e5e7bf11328f045205308244e11efc46",
    description: "Venture capital.",
    image:
      "https://assets.coingecko.com/coins/images/15864/thumb/logopngnew.png?1622172524",
  },
  {
    networkId: 1,
    name: "ETHA Lend",
    symbol: "etha",
    address: "0x59e9261255644c411afdd00bd89162d09d862e38",
    description: "Governance Token",
    image:
      "https://assets.coingecko.com/coins/images/14141/thumb/etha_logo200x200.png?1614646986",
  },
  {
    networkId: 137,
    name: "EasyFi",
    symbol: "ez",
    address: "0x34c1b299a74588d6abdc1b85a53345a48428a521",
    description: "Layer 2 lending platform.",
    image:
      "https://assets.coingecko.com/coins/images/12742/thumb/Logo_Icon.png?1624471467",
  },
  {
    networkId: 137,
    name: "ETHA Lend",
    symbol: "ez",
    address: "0x59e9261255644c411afdd00bd89162d09d862e38",
    description: "Lending platform governance.",
    image:
      "https://assets.coingecko.com/coins/images/14141/thumb/etha_logo200x200.png?1614646986",
  },
  {
    networkId: 1,
    name: "SuperFarm",
    symbol: "super",
    address: "0xe53ec727dbdeb9e2d5456c3be40cff031ab40a55",
    description:
      "cross-chain DeFi protocol that allows users to deploy crypto and NFT farms with no code",
    image:
      "https://assets.coingecko.com/coins/images/14040/thumb/6YPdWn6.png?1613975899",
  },
  {
    networkId: 1,
    name: "PolkaDex",
    symbol: "pdex",
    address: "0xf59ae934f6fe444afc309586cc60a84a0f89aaea",
    description: "A substrate-based DEX.",
    image:
      "https://assets.coingecko.com/coins/images/14833/thumb/dIze5Ztl_400x400.jpg?1618610724",
  },
  {
    networkId: 1,
    name: "Dafi-protocol",
    symbol: "dafi",
    address: "0xfc979087305a826c2b2a0056cfaba50aad3e6439",
    description: "Creates synthetics to reward networks",
    image:
      "https://assets.coingecko.com/coins/images/14428/thumb/Dafi_Black_Icon.png?1616040406",
  },
  {
    networkId: 1,
    name: "Uniswap",
    symbol: "uni",
    address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    description:
      "Governance token for Uniswap, an Automated Market Market DEX on the Ethereum blockchain.",
    image:
      "https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604",
  },
  {
    networkId: 1,
    name: "ChainLink",
    symbol: "link",
    address: "0x514910771af9ca656af840dff83e8264ecf986ca",
    description:
      "Chainlink is a decentralized oracle service, the first of its kind.",
    image:
      "https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png?1547034700",
  },
];

export const ToSelect = () => {
  const { fromSymbol, fromAddress, setToSymbol, setToAddress, txAmount } =
    useActions();
  const { setDialog } = useExperts();
  const { setQuoteValid } = useQuote();

  const handleChange = async (e) => {
    console.groupCollapsed("ToSelect::handleChange():");
    console.log("event:", e);
    console.log("offeringData:", offeringData);
    let selectedIndex = e.target.options.selectedIndex;
    console.log("selectedIndex:", selectedIndex);
    if (selectedIndex > 0) {
      let selectedSymbol =
        e.target.childNodes[selectedIndex].attributes.value.value;
      console.log("selectedOption:", selectedSymbol);
      setToSymbol(selectedSymbol.toUpperCase());
      let selectedRecord = offeringData.find(
        (token) => token.symbol === selectedSymbol
      );
      console.log("selectedRecord:", selectedRecord);
      let selectedAddress = selectedRecord.address;
      console.log("selectedAddress:", selectedAddress);
      setToAddress(selectedAddress);
      console.log("...quote request parameters:");
      console.log("fromSymbol:", fromSymbol);
      console.log("fromTokenAddress: **", fromAddress);
      console.log("toSymbol:", selectedSymbol);
      console.log("toAddress: **", selectedAddress);
      console.log("amount: **", txAmount);
      console.groupEnd();
      setDialog(
        "Press the 'Get Swap Quote' " +
          "to get a quote to swap " +
          fromSymbol +
          " to " +
          selectedSymbol.toUpperCase() +
          "."
      );
    } else {
      console.log("null selection made.");
      console.groupEnd();
      setToSymbol("");
      setToAddress("");
      setDialog("Select a token to receive from the pull-down menu.");
    }
    setQuoteValid("false");
  };

  return (
    <Flex width="100%">
      <FormControl id="swapto" isRequired>
        <Select
          id="toToken"
          placeholder="Select a token to receive."
          boxShadow="dark-lg"
          onChange={handleChange}
        >
          {offeringData
            .filter(
              (token) => token.symbol.toUpperCase() !== fromSymbol.toUpperCase()
            )
            .map((token) => {
              return (
                <option key={token.name} value={token.symbol}>
                  Into {token.name}
                </option>
              );
            })}
        </Select>
        <FormErrorMessage>
          Please select from the given list of input tokens.
        </FormErrorMessage>
      </FormControl>
    </Flex>
  );
};
