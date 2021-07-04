import { Image } from "@chakra-ui/react";
import Sameagle from "../../media/characters/Sameagle.svg";
export const PayPal = (props) => {
  props.speak(
    '"Ask not what your fiat can do for you.  Ask what crypto can you purchase!"'
  );
  return (
    <Image
      onClick={props.poke}
      boxSize="380px"
      src={Sameagle}
      alt="Uncle Sam Eagle"
      marginLeft="7vw"
    />
  );
};
