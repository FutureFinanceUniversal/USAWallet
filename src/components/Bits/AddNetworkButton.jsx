import { Button } from "@chakra-ui/react";

export const AddNetworkButton = (props) => {
  const ethereum = window.ethereum;

  async function addPolygonTestnetNetwork() {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }], // Hexadecimal version of 80001, prefixed with 0x
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13881", // Hexadecimal version of 80001, prefixed with 0x
                chainName: "POLYGON Mumbai",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: [
                  "https://speedy-nodes-nyc.moralis.io/cebf590f4bcd4f12d78ee1d4/polygon/mumbai",
                ],
                blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com/"],
                iconUrls: [""],
              },
            ],
          });
        } catch (addError) {
          console.log("Did not add network");
        }
      }
    }
  }

  return <Button onClick={addPolygonTestnetNetwork}>Add Polygon</Button>;
};
