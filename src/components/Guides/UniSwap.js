import { Image } from "@chakra-ui/react";
import Benicorn from "../../media/characters/Benicorn.svg";
export const UniSwap = (props) => {
  props.speak('"A token saved is a token earning."');
  return (
    <Image
      onClick={props.poke}
      boxSize="360px"
      src={Benicorn}
      alt="Liberty Fox"
      marginLeft="10px"
    />
  );
};
