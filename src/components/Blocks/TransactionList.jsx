import { Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { useTransactions } from "../../hooks/useTransactions";

export const TransactionList = (props) => {
  const { Txs, isLoading } = useTransactions({ chain: "eth" });

  console.groupCollapsed("TransactionList");
  console.log("Recieved transactions: ", Txs);
  console.groupEnd();

  if (!isLoading) {
    return (
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Time</Th>
            <Th>Transacted With</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Skeleton>
              <Tr key="loadingTransactionHistory">
                <Td>Blah</Td>
                <Td>Bitty</Td>
                <Td>Blah</Td>
                <Td>Blah</Td>
              </Tr>
            </Skeleton>
          ) : (
            Txs.map((Tx) => {
              return (
                <Tr key={Tx.hash}>
                  <Td>{Tx.block_timestamp.toLocaleDateString()}</Td>
                  <Td>{Tx.block_timestamp.toLocaleTimeString()}</Td>
                  <Td>{Tx.counterparty}</Td>
                  <Td>{(Tx.amount / 10 ** props.decimals).toPrecision(3)}</Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
    );
  } else return <Text>Transactions Loading...</Text>;
};
