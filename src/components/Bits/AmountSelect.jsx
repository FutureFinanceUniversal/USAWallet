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

export const AmountSelect = (props) => {
  const [maxSpend, setMaxSpend] = useState(0);
  const [decimals, setDecimals] = useState(18);
  const { positions, waiting } = usePositions();

  useEffect(() => {
    let position = {};
    if (!waiting) {
      if (props.fromSymbol) {
        position = positions.find(
          (position) =>
            position.symbol.toUpperCase() === props.fromSymbol.toUpperCase()
        );
        console.log("Identified from position: ", position);
        setMaxSpend(position ? position.tokens : 0);
        setDecimals(position ? position.decimals : 0);
      } else {
        console.error("No fromSymbol received.");
      }
    } else {
      console.error("No portfolio received.");
    }
  }, [positions, props.fromSymbol, waiting]);

  console.groupCollapsed("AmountSelect");
  console.log("Received portfolio: ", positions);
  console.log("Received fromSymbol: ", props.fromSymbol);

  console.groupEnd();
  return (
    <Box>
      <FormControl id="swapamount" isRequired>
        <NumberInput
          enable={props.fromToken ? true : false}
          max={maxSpend}
          min={0}
          onChange={(valueString) =>
            props.setSwapAmount(valueString * 10 ** decimals)
          }
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
