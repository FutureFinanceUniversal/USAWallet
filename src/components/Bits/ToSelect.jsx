import {
  Avatar,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { useTokenData } from "../../hooks/useTokenData";

export const ToSelect = () => {
  const { polkalokrData } = useTokenData("polkalokr");
  const { superfarmData } = useTokenData("superfarm");
  const { polkadexData } = useTokenData("polkadex");
  const { dafiData } = useTokenData("dafi-protocol");
  const { uniswapData } = useTokenData("uniswap");
  const { chainlinkData } = useTokenData("chainlink");
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
    <Box>
      <FormControl id="swapto" isRequired>
        <FormLabel>To Token</FormLabel>
        <Select placeholder="Select option">
          {offeringData.map((token) => {
            return (
              <Tooltip label={token.description.en}>
                <option value={token.symbol}>
                  <Avatar
                    name={token.symbol}
                    src={token.image.thumb}
                    size="sm"
                  />
                  {token.name} @ ${token.price}/{token.symbol}
                </option>
              </Tooltip>
            );
          })}
        </Select>
        <FormHelperText>Select token flavor to receive.</FormHelperText>
        <FormErrorMessage>
          Please select from the given list of input tokens.
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
};
