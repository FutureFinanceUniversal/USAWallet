import { Box, Flex, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ByMoralis } from "react-moralis";
import "./BottomFooter.css";

import Unicorn from "../../media/logos/OneInch.jpg";

library.add(fab, faCheckSquare, faCoffee);

export const BottomFooter = () => {
  return (
    <Flex justifyContent="center">
      <Spacer />
      <HStack>
        <Text>Built in the USA with: </Text>
        <ByMoralis />
        <Box
          className="OneInchLogo"
          margin_left={1}
          width="10vw"
          borderRadius="full"
          background_image={Unicorn}
        >
          <Image
            borderRadius="full"
            borderWidth={1}
            name="1InchUnicorn"
            src={Unicorn}
            color="lightblue"
            mr={3}
          />
        </Box>
      </HStack>
      <Spacer />
      <HStack>
        <Text>Join the Crypto Nation: </Text>
        <FontAwesomeIcon
          className="FAIcon"
          icon={["fab", "discord"]}
          size="2x"
          color="lightblue"
        />
        <FontAwesomeIcon
          className="FAIcon"
          icon={["fab", "facebook-square"]}
          size="2x"
          color="lightblue"
        />
        <FontAwesomeIcon
          className="FAIcon"
          icon={["fab", "instagram-square"]}
          size="2x"
          color="lightblue"
        />
        <FontAwesomeIcon
          className="FAIcon"
          icon={["fab", "pinterest-square"]}
          size="2x"
          color="lightblue"
        />
        <FontAwesomeIcon
          className="FAIcon"
          icon={["fab", "reddit-square"]}
          size="2x"
          color="lightblue"
        />
        <FontAwesomeIcon
          className="FAIcon"
          icon={["fab", "telegram"]}
          size="2x"
          color="lightblue"
        />
        <FontAwesomeIcon
          className="FAIcon"
          icon={["fab", "twitter-square"]}
          size="2x"
          color="lightblue"
        />
      </HStack>
      <Spacer />
    </Flex>
  );
};
