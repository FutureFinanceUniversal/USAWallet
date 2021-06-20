import "./App.css";
import { Flex } from "@chakra-ui/react";
// import {useColorMode } from '@chakra-ui/react';
import { TopNavBar } from "./Blocks/TopNavBar";

function App() {
  return (
    <Flex width="100vw" className="AppOuterFlex">
      <TopNavBar />
    </Flex>
  );
}

export default App;
