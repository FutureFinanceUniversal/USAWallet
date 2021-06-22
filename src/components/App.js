import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { TopNavBar } from "./Blocks/TopNavBar";
import { LeftGutter } from "./Blocks/LeftGutter";
import { MainStage } from "./Blocks/MainStage";
import { RightGutter } from "./Blocks/RightGutter";
import { BottomFooter } from "./Blocks/BottomFooter";
import darkBG from "../media/wallpapers/dark1.jpg";
import lightBG from "../media/wallpapers/light1.jpg";

function App() {
  const { colorMode } = useColorMode();
  return (
    <Grid
      className="AppOuterFlex"
      w="100vw"
      h="100vh"
      gap={3}
      templateColumns="repeat(10,1fr)"
      templateRows="repeat(10,1fr)"
      bg={colorMode === "light" ? lightBG : darkBG}
    >
      <GridItem colSpan={10} borderWidth={1} borderRadius="lg">
        <TopNavBar />
      </GridItem>
      <GridItem rowSpan={8} colSpan={2} borderWidth={1} borderRadius="lg">
        <LeftGutter />
      </GridItem>
      <GridItem rowSpan={8} colSpan={6} borderWidth={1} borderRadius="lg">
        <MainStage />
      </GridItem>
      <GridItem rowSpan={8} colSpan={2} borderWidth={1} borderRadius="lg">
        <RightGutter />
      </GridItem>
      <GridItem colSpan={10} borderWidth={1} borderRadius="lg">
        <BottomFooter />
      </GridItem>
    </Grid>
  );
}

export default App;
