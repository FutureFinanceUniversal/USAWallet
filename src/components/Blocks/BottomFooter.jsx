import { Flex, Spacer } from "@chakra-ui/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BottomFooter.css";

library.add(fab, faCheckSquare, faCoffee);

export const BottomFooter = () => {
  return (
    <Flex justifyContent="center">
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "blogger"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "discord"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "facebook-square"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "github-square"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "google-plus-square"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "instagram-square"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "medium"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "microblog"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "pinterest-square"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "reddit-square"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        con={["fab", "snapchat-square"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "telegram"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "ticktok"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "tumblr-square"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "twitch"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "twitter-square"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "viber"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "whatsapp-square"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
      <FontAwesomeIcon
        className="FAIcon"
        icon={["fab", "yelp"]}
        size="2x"
        color="lightblue"
      />
      <Spacer />
    </Flex>
  );
};
