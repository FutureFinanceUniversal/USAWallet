import { Button, Tooltip } from "@chakra-ui/react";
import { useExperts } from "../../contexts/expertsContext";

export const ExpertButton = (props) => {
  const { expertsOn, toggleExperts } = useExperts();

  return (
    <Tooltip label="Toggle expert advice.">
      <Button
        boxShadow="dark-lg"
        mr={2}
        mt={-2}
        className="ExpertButton"
        onClick={() => toggleExperts(!expertsOn)}
      >
        {expertsOn ? "Mute Experts" : "Call Experts"}
      </Button>
    </Tooltip>
  );
};
