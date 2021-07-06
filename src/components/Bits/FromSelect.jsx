import {
  Avatar,
  Box,
  FormControl,
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
    <Box width="100%">
      <FormControl id="swapfrom" isRequired>
        <Select id="fromToken" placeholder="Select a token to trade from.">
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
        <FormErrorMessage>
          Please select from the tokens in your portfolio.
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
};
