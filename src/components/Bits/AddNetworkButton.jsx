import { Button } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useNetwork } from "../../contexts/networkContext";

export const AddNetworkButton = (props) => {
  const ethereum = window.ethereum;
  const { web3 } = useMoralis();
  const { networkId, setNetworkId } = useNetwork();
  const networkIDHex = web3.utils.toHex("137");

  async function addPolygonNetwork() {
    console.groupCollapsed("AddNetworkButton");
    console.log(
      "web3.utils.toHex(137) should be 13881: ",
      web3.utils.toHex(80001)
    );
    console.log("networkIDHex:", networkIDHex);

    if (networkId !== 137) {
      try {
        console.log("Attempting simple ethereum.request()...");
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networkIDHex }], // Hexadecimal version of 80001, prefixed with 0x
        });
        setNetworkId(137);
      } catch (error) {
        if (error.code === 4902) {
          console.log("...failed.  attempting complex call...");
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: networkIDHex, // Hexadecimal version of 80001, prefixed with 0x
                  chainName: "POLYGON Mainnet",
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  rpcUrls: [
                    "https://speedy-nodes-nyc.moralis.io/b18bab00073ceeeeed714bf2/polygon/mainnet",
                  ],
                  blockExplorerUrls: ["https://explorer.matic.network//"],
                  iconUrls: [""],
                },
              ],
            });
            setNetworkId(137);
          } catch (addError) {
            console.log("Did not add network");
          }
        }
      }
    }
    console.log("...process end.");
    console.groupEnd();
  }

  return (
    <Button
      mr={2}
      mt={-2}
      className="ExpertButton"
      boxShadow="dark-lg"
      visible={window.ethereum.chainId === networkIDHex ? "hidden" : "visible"}
      onClick={addPolygonNetwork}
    >
      Add Polygon
    </Button>
  );
};
