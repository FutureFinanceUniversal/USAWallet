import { FormControl, Flex, FormErrorMessage, Select } from "@chakra-ui/react";
import { useActions } from "../../contexts/actionsContext";
// import { useTokenData } from "../../hooks/useTokenData";

const offeringData = [
  {
    name: "Polkalokr",
    symbol: "lkr",
    address: "0x80ce3027a70e0a928d9268994e9b85d03bd4cdcf",
    description: "Customisable escrow for token economies",
    image:
      "https://assets.coingecko.com/coins/images/14692/thumb/coingeckoLogo.png?1617809622",
  },
  {
    name: "SuperFarm",
    symbol: "super",
    address: "0xe53ec727dbdeb9e2d5456c3be40cff031ab40a55",
    description:
      "cross-chain DeFi protocol that allows users to deploy crypto and NFT farms with no code",
    image:
      "https://assets.coingecko.com/coins/images/14040/thumb/6YPdWn6.png?1613975899",
  },
  {
    name: "PolkaDex",
    symbol: "pdex",
    address: "0xf59ae934f6fe444afc309586cc60a84a0f89aaea",
    description: "A substrate-based DEX.",
    image:
      "https://assets.coingecko.com/coins/images/14833/thumb/dIze5Ztl_400x400.jpg?1618610724",
  },
  {
    name: "Dafi-protocol",
    symbol: "dafi",
    address: "0xfc979087305a826c2b2a0056cfaba50aad3e6439",
    description: "Creates synthetics to reward networks",
    image:
      "https://assets.coingecko.com/coins/images/14428/thumb/Dafi_Black_Icon.png?1616040406",
  },
  {
    name: "Uniswap",
    symbol: "uni",
    address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    description:
      "Governance token for Uniswap, an Automated Market Market DEX on the Ethereum blockchain.",
    image:
      "https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604",
  },
  {
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
  const { setToSymbol, setToAddress } = useActions();

  const handleChange = (e) => {
    let selectedIndex = e.target.options.selectedIndex - 1;
    setToSymbol(offeringData[selectedIndex].symbol);
    setToAddress(offeringData[selectedIndex].address);
  };

  return (
    <Flex width="100%">
      <FormControl id="swapto" isRequired>
        <Select
          id="toToken"
          placeholder="Select a token to receive."
          onChange={handleChange}
        >
          {offeringData.map((token) => {
            return <option key={token.name}>Into {token.name}</option>;
          })}
        </Select>
        <FormErrorMessage>
          Please select from the given list of input tokens.
        </FormErrorMessage>
      </FormControl>
    </Flex>
  );
};
