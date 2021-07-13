import {
  FormControl,
  FormLabel,
  FormHelperText,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useExperts } from "../../contexts/expertsContext";

console.groupCollapsed("ModeSelect");
console.groupEnd();

export const ModeSelect = () => {
  const { actionMode, setActionMode } = useExperts();

  return (
    <FormControl as="fieldset" borderWidth={2} paddingLeft={12}>
      <FormLabel as="legend">Select an action</FormLabel>
      <RadioGroup defaultValue={actionMode}>
        <HStack spacing="24px">
          <Radio
            value="swap"
            onClick={() => {
              setActionMode("swap");
            }}
          >
            Trade
          </Radio>
          <Radio
            value="send"
            onClick={() => {
              setActionMode("send");
            }}
          >
            Send
          </Radio>
          <Radio
            value="receive"
            onClick={() => {
              setActionMode("recieve");
            }}
          >
            Receive
          </Radio>
        </HStack>
      </RadioGroup>
      <FormHelperText>Select a crypto activity</FormHelperText>
    </FormControl>
  );
};
