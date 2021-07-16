import { Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { Assistants } from "../Blocks/Assistants";
import { useMoralis } from "react-moralis";
import React from "react";

import LadyLiberty from "../../media/Padding/LadyLiberty.jpg";

export const SideShow = () => {
  const { isAuthenticated } = useMoralis();
  return (
    <Grid templateRows="repeat(10,fr)" gap={6} height="100%">
      <GridItem rowSpan={1} colSpan={1} justifyContent="center">
        <Text marginLeft="35%">
          ----------<i>Side Show</i>----------
        </Text>
      </GridItem>
      {isAuthenticated ? (
        <>
          <GridItem rowSpan={15} colSpan={1}></GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Assistants />
          </GridItem>
        </>
      ) : (
        <GridItem
          rowSpan={9}
          colSpan={1}
          borderWidth={1}
          borderRadius="3xl"
          borderColor="white"
        >
          <Image borderRadius="3xl" src={LadyLiberty} alt="LadyLiberty" />
        </GridItem>
      )}
    </Grid>
  );
};
