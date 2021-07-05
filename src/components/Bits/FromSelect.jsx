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
import { usePositions } from "../../hooks/usePositions";

export const FromSelect = (props) => {
  const { positions, waiting } = usePositions();

  console.groupCollapsed("FromSelect");
  console.debug(
    waiting ? "Waiting for position data..." : "Received positions : ",
    positions
  );

  console.groupEnd();

  return (
    <Box>
      <FormControl id="swapfrom" isRequired>
        <FormLabel>From Token</FormLabel>
        <Select id="fromToken" placeholder="Select a token.">
          {!waiting &&
            positions.map((position) => {
              return (
                <Tooltip label={position.description}>
                  <option
                    value={position.symbol.toUpperCase()}
                    onClick={props.setFromSymbol(position.symbol)}
                  >
                    <Avatar
                      name={position.symbol}
                      src={position.image}
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
