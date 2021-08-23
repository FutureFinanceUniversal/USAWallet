import { FormControl, Flex, FormErrorMessage, Input } from "@chakra-ui/react";
import { useActions } from "../../contexts/actionsContext";

export const ToAddress = () => {
  const { fromSymbol, setToSymbol, toAddress, setToAddress } = useActions();
  console.groupCollapsed("ToAddress");
  console.groupEnd();

  const handleChange = (e) => {
    setToSymbol(fromSymbol);
    setToAddress(e.target.value);
    console.groupCollapsed("ToAddress");
    console.log("Set toAddress:", toAddress);
    console.groupEnd();
  };

  return (
    <Flex width="100%">
      <FormControl id="toAddress" isRequired>
        <Input
          variant="outline"
          placeholder="Enter recipiant address"
          boxShadow="dark-lg"
          onChange={handleChange}
        />
        <FormErrorMessage>Please enter a valid address.</FormErrorMessage>
      </FormControl>
    </Flex>
  );
};
