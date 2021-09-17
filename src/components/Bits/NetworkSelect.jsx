import { Select } from "@chakra-ui/react";
import { useNetwork } from "../../contexts/networkContext";

export const NetworkSelect = () => {
  const { setNetworkId, setNetworkName } = useNetwork();

  const handleChange = async (e) => {
    let selectedIndex = e.target.options.selectedIndex;
    console.log("selectedIndex:", selectedIndex);
    if (selectedIndex > 0) {
      let selectedOption =
        e.target.childNodes[selectedIndex].attributes.value.value;
      console.log("selectedOption:", selectedOption);
      setNetworkName(selectedOption === "ethereum" ? "eth" : "polygon");
      setNetworkId(selectedOption === "ethereum" ? 1 : 137);
    }
  };

  return (
    <Select placeholder="Select Network" width="750" onChange={handleChange}>
      <option value="ethereum">Ethereum</option>
      <option value="polygon">Polygon</option>
    </Select>
  );
};
