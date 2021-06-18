import {
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export const ErrorBox = ({ title, message, updateParent }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription display="block">{message}</AlertDescription>
      </Box>
    </Alert>
  );
};
