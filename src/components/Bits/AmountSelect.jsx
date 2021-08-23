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
import { useExperts } from "../../contexts/expertsContext";

export const AmountSelect = () => {
  const [maxSpend, setMaxSpend] = useState(0);
  const [decimals, setDecimals] = useState(18);
  const [value, setValue] = useState(0);
  const { positions, waiting } = usePositions();
  const { fromSymbol, setTxAmount } = useActions();
  const { setActionMode, setDialog } = useExperts();

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
        setMaxSpend(position ? position.tokens : 0);
        setDecimals(position ? position.decimals : 0);
      } else {
        console.log("AmountSelect::useEffect::!waiting::noFromSymbol.");
      }
    } else {
      console.log("AmountSelect::useEffect::waiting.");
    }
    setActionMode("recieve");
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          boxShadow="dark-lg"
          onChange={(valueString) => {
            setValue(parse(valueString));
            setTxAmount(valueString * 10 ** decimals);
            if (valueString > 0) {
              setDialog(
                "Now using " +
                  ((100 * valueString) / maxSpend).toFixed(0) +
                  "% of your " +
                  fromSymbol +
                  " in this action.  " +
                  "Press one of the action buttons " +
                  "when you are ready " +
                  "to choose what to do with these tokens."
              );
            } else {
              setDialog(
                "Use the up and down arrows " +
                  "to select how much " +
                  fromSymbol +
                  " to use in this action.  " +
                  "Arrows step in 10% increments of your balance."
              );
            }
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
