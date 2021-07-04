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
import { usePortfolio } from "../../contexts/portfolioContext";

export const FromSelect = (props) => {
  const portfolio = usePortfolio();

  console.groupCollapsed("FromSelect");
  console.debug("Received portfolio: ", portfolio);
  console.groupEnd();

  return (
    <Box>
      <FormControl id="swapfrom" isRequired>
        <FormLabel>From Token</FormLabel>
        <Select
          placeholder="Select a token."
          onChange={props.setFromSymbol(this.value)}
        >
          {portfolio.positions.map((position) => {
            return (
              <Tooltip label={position.description}>
                <option value={position.symbol.toUpperCase()}>
                  <Avatar
                    name={position.symbol}
                    src={position.image.thumb}
                    size="sm"
                  />
                  {position.tokens.toPrecision(3)} {position.name} @ $
                  {position.price}/{position.symbol} = {position.value}
                </option>
              </Tooltip>
            );
          })}
        </Select>
        <FormHelperText>Select token flavor to give.</FormHelperText>
        <FormErrorMessage>
          Please select from the tokens in your portfolio.
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
};
