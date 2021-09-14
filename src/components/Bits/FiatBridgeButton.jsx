import { Button } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";

const appId = "UeAbfYO3C29W5EHdz5c5BuCItODRdOw8RcHDpAud";
const serverUrl = "https://qvgfrpeymufw.bigmoralis.com:2053/server";

export const FiatBridgeButton = () => {
  const { Moralis } = useMoralis();

  const handlePress = async () => {
    await Moralis.initialize(appId);
    Moralis.serverURL = serverUrl;

    // Am I missing something here?
    console.groupCollapsed("FiatBridgeButton");
    console.log("Moralis:", Moralis);
    console.groupEnd();

    // ...yes actually.  initPlugins() is not a member of Moralis.
    await Moralis.initPlugins();
    Moralis.Plugins.fiat.buy();
  };

  return (
    <>
      <Button
        mr={2}
        mt={-2}
        className="BuyButton"
        boxShadow="dark-lg"
        onClick={handlePress}
      >
        Buy/Sell Crypto
      </Button>
      <iframe
        title="Fiat Bridge"
        id="marketIframe"
        src=""
        width="350"
        height="650"
        style={{ display: "none" }}
      ></iframe>
    </>
  );
};
