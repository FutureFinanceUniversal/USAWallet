import { Flex, Text } from "@chakra-ui/react";
import { useTransactions } from "../../hooks/useTransactions";

export const TransactionList = (props) => {
  const transactions = useTransactions({
    tokenName: props.tokenName,
    tokenSymbol: props.tokenSymbol,
  });

  console.groupCollapsed("TransactionList");
  console.debug("Received transactions:", transactions);
  console.groupEnd();

  return (
    <Flex justifyContent="center">
      {transactions.map((transaction) => {
        return (
          <Text>
            {transaction.dateStr}
            {transaction.timeStr}
            {transaction.counterparty}
            {transaction.amount}
            {props.tokenSymbol.toUpperCase()}
          </Text>
        );
      })}
    </Flex>
  );
};
