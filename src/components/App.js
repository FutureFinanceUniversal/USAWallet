import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { TopNavBar } from "./Pages/TopNavBar";
import { LeftGutter } from "./Pages/LeftGutter";
import { MainStage } from "./Pages/MainStage";
import { SideShow } from "./Pages/SideShow";
import { RightGutter } from "./Pages/RightGutter";
import { BottomFooter } from "./Pages/BottomFooter";

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
      <GridItem colSpan={10}>
        <TopNavBar />
      </GridItem>
      <GridItem rowSpan={8} colSpan={1}>
        <LeftGutter />
      </GridItem>
      <GridItem rowSpan={8} colSpan={5} borderWidth={1} borderRadius="lg">
        <MainStage />
      </GridItem>
      <GridItem rowSpan={8} colSpan={3} borderWidth={1} borderRadius="lg">
        <SideShow />
      </GridItem>
      <GridItem rowSpan={8} colSpan={1}>
        <RightGutter />
      </GridItem>
      <GridItem colSpan={10}>
        <BottomFooter />
      </GridItem>
    </Grid>
  );
}

export default App;
