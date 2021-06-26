import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

export const TokenTable = () => {
  const { isAuthenticated, Moralis } = useMoralis();
  const [array, setData] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      Moralis.Web3.getAllERC20({ usePost: true }).then((dataArray) => {
        setData(dataArray);
      });
    }
  }, [isAuthenticated, Moralis]);

  //<Text>{dataArray.map(d=>(<li></li>))}</Text>
  return (
    <Table variant="simple">
      <TableCaption>- Token Balances -</TableCaption>
      <Thead>
        <Tr>
          <Th>Token</Th>
          <Th>Symbol</Th>
          <Th isNumeric>Balance</Th>
        </Tr>
      </Thead>
      <Tbody>
        {array.map((r) => (
          <Tr key={r.name}>
            <Td>{r.name}</Td>
            <Td>{r.symbol}</Td>
            <Td>{r.balance / 10 ** r.decimals}</Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot></Tfoot>
    </Table>
  );
};
