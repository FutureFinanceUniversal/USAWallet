import { Button, IconButton } from "@chakra-ui/react";
import { CopyIcon, DownloadIcon } from "@chakra-ui/icons";
import { useExperts } from "../../contexts/expertsContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";

export const CopyAddress = (props) => {
  const { isAuthenticated, user } = useMoralis();
  const { setActionMode, setDialog } = useExperts();
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState("0x0");

  useEffect(() => {
    if (copied) {
      setActionMode("recieve");
      setDialog(
        "Your wallet address has been copied to the clipboard.  " +
          "Paste your address as the destination " +
          "in the market withdraw or send entry, " +
          "then carefully check the address before sending!  " +
          "Malware can change your destination address in the clipboard!"
      );
      setCopied(false);
    } else {
      if (isAuthenticated) {
        setData(user?.attributes["ethAddress"]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copied, isAuthenticated]);

  return (
    <>
      <CopyToClipboard text={data} onCopy={() => setCopied(true)}>
        {props.mode === "copy" ? (
          <IconButton
            disabled={!isAuthenticated}
            variant="outline"
            aria-label="Copy Address to Clipboard"
            icon={<CopyIcon />}
          />
        ) : (
          <Button disabled={!isAuthenticated} rightIcon={<DownloadIcon />}>
            Receive
          </Button>
        )}
      </CopyToClipboard>
    </>
  );
};
