import { Button, HStack, Text, Tooltip } from "@chakra-ui/react";
import { EmailIcon, RepeatIcon, RepeatClockIcon } from "@chakra-ui/icons";
import { useExperts } from "../../contexts/expertsContext";
import { CopyAddress } from "./CopyAddress";

export const ModeSelect = () => {
  const { setActionMode, setDialog } = useExperts();

  return (
    <>
      {" "}
      <Text>Select an Action:</Text>
      <HStack>
        <Tooltip hasArrow label="Swap some of one token for another token.">
          <Button
            rightIcon={<RepeatIcon />}
            boxShadow="dark-lg"
            onClick={() => {
              setActionMode("swap");
              setDialog('"Select a token to receive from the pull-down menu."');
            }}
          >
            Swap
          </Button>
        </Tooltip>
        <Tooltip hasArrow label="Send some of this token to an address.">
          <Button
            rightIcon={<EmailIcon />}
            boxShadow="dark-lg"
            onClick={() => {
              setActionMode("send");
              setDialog('"Enter the destination Ethereum address."');
            }}
          >
            Send
          </Button>
        </Tooltip>
        <Tooltip hasArrow label="Ask about our Crypto Patriot program.">
          <Button
            rightIcon={<RepeatClockIcon />}
            boxShadow="dark-lg"
            onClick={() => {
              setActionMode("invest");
              setDialog("Ask about our CRYPTO PATRIOTS program, coming soon!");
            }}
          >
            Invest
          </Button>
        </Tooltip>
        <CopyAddress mode="receive" boxShadow="dark-lg" />
      </HStack>
    </>
  );
};
