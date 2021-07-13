import {
  Avatar,
  FormControl,
  Flex,
  FormErrorMessage,
  Select,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useTokenData } from "../../hooks/useTokenData";

export const ToSelect = () => {
  const polkalokrData = useTokenData("polkalokr");
  const superfarmData = useTokenData("superfarm");
  const polkadexData = useTokenData("polkadex");
  const dafiData = useTokenData("dafi-protocol");
  const uniswapData = useTokenData("uniswap");
  const chainlinkData = useTokenData("chainlink");
  const offeringData = [
    polkalokrData,
    superfarmData,
    polkadexData,
    dafiData,
    uniswapData,
    chainlinkData,
  ];

  console.groupCollapsed("ToSelect");
  console.debug("offeringData: ", offeringData);
  console.groupEnd();

  return (
    <Flex width="100%">
      <FormControl id="swapto" isRequired>
        <Select placeholder="Select a token to receive.">
          {offeringData &&
            offeringData.map((token) => {
              if (token) {
                return (
                  <Tooltip label={token.description}>
                    <option key={token.name} value={token.symbol}>
                      <Avatar name={token.symbol} src={token.image} size="sm" />
                      {token.name} @ ${token.price}/{token.symbol}
                    </option>
                  </Tooltip>
                );
              } else {
                return <Text>Empty Portfolio.</Text>;
              }
            })}
        </Select>
        <FormErrorMessage>
          Please select from the given list of input tokens.
        </FormErrorMessage>
      </FormControl>
    </Flex>
  );
};
