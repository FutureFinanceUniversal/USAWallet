import {
  Box,
  FormControl,
  FormErrorMessage,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { usePositions } from "../../hooks/usePositions";
import { useActions } from "../../contexts/actionsContext";

export const FromSelect = () => {
  const { positions, waiting } = usePositions();
  const { setFromAddress, setFromSymbol } = useActions();

  const handleChange = (e) => {
    setFromSymbol(e.target.value.symbol);
    setFromAddress(e.target.value.address);
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
                    value={{
                      symbol: position.symbol.toUpperCase(),
                      address: position.address,
                    }}
                    onClick={() => {
                      setFromSymbol(position.symbol);
                      setFromAddress(position.address);
                    }}
                  >
                    From {position.tokens.toPrecision(3)} {position.name} @ $
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
