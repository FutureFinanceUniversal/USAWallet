import { Image } from "@chakra-ui/react";
import Sameagle from "../../media/characters/Sameagle.svg";
export const PayPal = (props) => {
  return (
    <Image
      height="200px"
      width="200px"
      transform="scale(1.75,1.75) translate(32px,35px)"
      src={Sameagle}
      alt="Uncle Sam Eagle"
    />
  );
};
