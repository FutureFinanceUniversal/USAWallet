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
  console.groupEnd();

  const handleChange = (e) => {
    props.setFromSymbol(e.target.value);
  };

  return (
    <Box width="100%">
      <FormControl id="swapfrom" isRequired>
        <Select
          id="fromToken"
          placeholder="Select a token to act with."
          onChange={handleChange}
        >
          {!waiting &&
            positions.map((position) => {
              return (
                <Tooltip key={position.symbol} label={position.description}>
                  <option
                    value={position.symbol.toUpperCase()}
                    onClick={() => {
                      console.log("Selecting fromSymbol:", position.symbol);
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
