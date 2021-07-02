import { Button, Tooltip } from "@chakra-ui/react";

console.groupCollapsed("ExpertButton");
console.groupEnd();

export const ExpertButton = () => {
  return (
    <Tooltip label="Toggle expert advice.">
      <Button boxShadow="dark-lg" mr={2} mt={-2} className="ExpertButton">
        Mute Experts
      </Button>
    </Tooltip>
  );
};
