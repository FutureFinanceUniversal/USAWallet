import { Image } from "@chakra-ui/react";
import LibertyFox from "../../media/characters/LibertyFox.svg";
export const MetaMask = (props) => {
  props.speak('"Find freedom with MetaMask."');
  return (
    <Image
      onClick={props.poke}
      boxSize="460px"
      src={LibertyFox}
      alt="Liberty Fox"
      marginTop="-60px"
    />
  );
};
