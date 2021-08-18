import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { TopNavBar } from "./Pages/TopNavBar";
import { LeftGutter } from "./Pages/LeftGutter";
import { MainStage } from "./Pages/MainStage";
import { SideShow } from "./Pages/SideShow";
import { RightGutter } from "./Pages/RightGutter";
import { BottomFooter } from "./Pages/BottomFooter";

import { ExpertsProvider } from "../contexts/expertsContext";
import { ActionsProvider } from "../contexts/actionsContext";
import { QuoteProvider } from "../contexts/quoteContext";

function App() {
  const { colorMode } = useColorMode();

  return (
    <Grid
      className={`AppOuterFlex ${colorMode === "light" ? "lightBG" : "darkBG"}`}
      w="100vw"
      h="100vh"
      gap={3}
      templateColumns="repeat(10,1fr)"
      templateRows="repeat(10,1fr)"
    >
      <ExpertsProvider>
        <ActionsProvider>
          <QuoteProvider>
            <GridItem
              rowSpan={10}
              colSpan={1}
              borderWidth={1}
              borderRadius="3xl"
              borderColor={colorMode === "light" ? "darkgrey" : "darkblue"}
            >
              <LeftGutter />
            </GridItem>
            <GridItem colSpan={8} borderWidth={1} borderRadius="3xl">
              <TopNavBar />
            </GridItem>
            <GridItem
              rowSpan={10}
              colSpan={1}
              borderWidth={1}
              borderRadius="3xl"
              borderColor={colorMode === "light" ? "pink" : "darkred"}
            >
              <RightGutter />
            </GridItem>
            <GridItem
              rowSpan={8}
              colSpan={5}
              borderWidth={3}
              borderRadius="3xl"
              borderColor="red"
            >
              <MainStage />
            </GridItem>
            <GridItem
              rowSpan={8}
              colSpan={3}
              borderWidth={3}
              borderRadius="3xl"
              borderColor={colorMode === "light" ? "blue" : "white"}
            >
              <SideShow />
            </GridItem>
          </QuoteProvider>
        </ActionsProvider>
      </ExpertsProvider>

      <GridItem colSpan={8} borderWidth={1} borderRadius="3xl">
        <BottomFooter />
      </GridItem>
    </Grid>
  );
}

export default App;
