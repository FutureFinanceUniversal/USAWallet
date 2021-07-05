import { Image } from "@chakra-ui/react";
import Sameagle from "../../media/characters/Sameagle.svg";
export const PayPal = (props) => {
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
