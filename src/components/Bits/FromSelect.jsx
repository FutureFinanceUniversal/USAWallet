import {
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
        <Select id="fromToken" placeholder="Select a token to act with.">
          {!waiting &&
            positions.map((position) => {
              return (
                <Tooltip label={position.description}>
                  <option
                    value={position.symbol.toUpperCase()}
                    onClick={() => {
                      props.setFromSymbol(position.symbol);
                    }}
                  >
                    {position.tokens.toPrecision(3)} {position.name} @ $
                    {position.price.toFixed(2)}/{position.symbol.toUpperCase()}{" "}
                    = ${position.value.toFixed(2)}
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
