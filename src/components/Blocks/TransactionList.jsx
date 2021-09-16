import { Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { useTransactions } from "../../hooks/useTransactions";

export const TransactionList = (props) => {
  const { Txs, isLoading } = useTransactions({ chain: "eth" });

  if (!isLoading) {
    console.groupCollapsed("TransactionList");
    console.log(Txs);
    console.groupEnd();
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
            Txs?.map((Tx) => {
              Tx.timestamp = new Date(Tx.block_timestamp);
              return (
                <Tr key={Tx.hash}>
                  <Td>{Tx.timestamp.toLocaleDateString()}</Td>
                  <Td>{Tx.timestamp.toLocaleTimeString()}</Td>
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
