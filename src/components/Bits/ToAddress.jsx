import { FormControl, Flex, FormErrorMessage, Input } from "@chakra-ui/react";

export const ToAddress = () => {
  console.groupCollapsed("ToAddress");
  console.groupEnd();

  return (
    <Flex width="100%">
      <FormControl id="addressto" isRequired>
        <Input variant="outline" placeholder="To Address" />
        <FormErrorMessage>Please enter a valid address.</FormErrorMessage>
      </FormControl>
    </Flex>
  );
};
