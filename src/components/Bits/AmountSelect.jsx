import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePortfolio } from "../../hooks/usePortfolio";

export const AmountSelect = (props) => {
  const { maxSpend, setMaxSpend } = useState(0);
  const { decimals, setDecimals } = useState(18);
  const { portfolio } = usePortfolio();

  useEffect(() => {
    let position = {};
    if (portfolio) {
      if (props.fromSymbol) {
        position = portfolio.positions.find(
          (position) =>
            position.symbol.toUpperCase() === props.fromSymbol.toUpperCase()
        );
        console.debug("Identified from position: ", position);
        setMaxSpend(position.tokens);
        setDecimals(position.decimals);
      } else {
        console.error("No fromSymbol received.");
      }
    } else {
      console.error("No portfolio received.");
    }
  });

  console.groupCollapsed("AmountSelect");
  console.debug("Received portfolio: ", portfolio);
  console.debug("Received fromSymbol: ", props.fromSymbol);

  console.groupEnd();
  return (
    <Box>
      <FormControl id="swapamount" isRequired>
        <FormLabel>Ammount</FormLabel>
        <NumberInput
          enable={props.fromToken ? true : false}
          max={maxSpend}
          min={0}
          onChange={props.setSwapAmount(this.value * 10 ** decimals)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormHelperText>Select how many tokens to offer.</FormHelperText>
        <FormErrorMessage>Please select an available amount.</FormErrorMessage>
      </FormControl>
    </Box>
  );
};
