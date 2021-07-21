import {
  Box,
  FormControl,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePositions } from "../../hooks/usePositions";
import { useActions } from "../../contexts/actionsContext";

export const AmountSelect = () => {
  const [maxSpend, setMaxSpend] = useState(0);
  const [decimals, setDecimals] = useState(18);
  const [value, setValue] = useState(0);
  const { positions, waiting } = usePositions();
  const { fromSymbol, txAmount, setTxAmount } = useActions();

  const format = (val) =>
    fromSymbol === undefined ? "" : val + " " + fromSymbol?.toUpperCase();

  const parse = (val) =>
    fromSymbol === undefined
      ? ""
      : val.replace(" " + fromSymbol?.toUpperCase(), "");

  useEffect(() => {
    let position = {};
    if (!waiting) {
      if (fromSymbol) {
        position = positions.find(
          (position) =>
            position.symbol.toUpperCase() === fromSymbol?.toUpperCase()
        );
        console.groupCollapsed("AmountSelect.useEffect()");
        console.log("Identified from position: ", position);
        console.groupEnd();
        setMaxSpend(position ? position.tokens : 0);
        setDecimals(position ? position.decimals : 0);
      }
    }
  }, [positions, fromSymbol, waiting]);

  return (
    <Box>
      <FormControl id="swapamount" isRequired>
        <NumberInput
          enable={fromSymbol ? 1 : 0}
          step={maxSpend / 10}
          max={maxSpend}
          min={0}
          precision={3}
          onChange={(valueString) => {
            setValue(parse(valueString));
            setTxAmount(valueString * 10 ** decimals);
            console.groupCollapsed("AmountSelect.onChange()");
            console.log("Set txAmount:", txAmount);
            console.groupEnd();
          }}
          value={format(value)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>Please select an available amount.</FormErrorMessage>
      </FormControl>
    </Box>
  );
};
