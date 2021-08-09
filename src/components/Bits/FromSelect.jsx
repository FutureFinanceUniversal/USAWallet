import { Box, FormControl, FormErrorMessage, Select } from "@chakra-ui/react";
import { usePositions } from "../../hooks/usePositions";
import { useActions } from "../../contexts/actionsContext";

export const FromSelect = () => {
  const { positions, waiting } = usePositions();
  const { setFromAddress, setFromSymbol } = useActions();

  const handleChange = (e) => {
    let selectedIndex = e.target.options.selectedIndex - 1;
    setFromSymbol(positions[selectedIndex].symbol);
    setFromAddress(positions[selectedIndex].address);
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
                <option
                  value={{
                    symbol: position.symbol.toUpperCase(),
                    address: position.address,
                  }}
                >
                  From {position.tokens.toPrecision(3)} {position.name} @ $
                  {position.price.toFixed(2)}/{position.symbol.toUpperCase()} =
                  ${position.value.toFixed(2)}
                </option>
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
