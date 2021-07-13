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
  const { actionMode, setActionMode, setDialog } = useExperts();

  return (
    <FormControl as="fieldset" borderWidth={2} paddingLeft={12}>
      <FormLabel as="legend">Select an action</FormLabel>
      <RadioGroup defaultValue={actionMode}>
        <HStack spacing="24px">
          <Radio
            value="swap"
            onClick={() => {
              setActionMode("swap");
              setDialog('"A token saved is a token earning."');
            }}
          >
            Trade
          </Radio>
          <Radio
            value="send"
            onClick={() => {
              setActionMode("send");
              setDialog('"Find freedom with MetaMask."');
            }}
          >
            Send
          </Radio>
          <Radio
            value="receive"
            onClick={() => {
              setActionMode("recieve");
              setDialog(
                '"Ask not what your fiat can do for you.  Ask what crypto can you purchase!"'
              );
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
