import { IconButton, useColorMode, Tooltip } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export const LightSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Tooltip label={colorMode === "light" ? "Dark Mode" : "Light Mode"}>
      <IconButton
        className="LightSwitchButton"
        mr={2}
        mt={-2}
        aria-label="Toggle Darkmode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        boxShadow={colorMode === "light" ? "dark-lg" : "light-lg"}
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};
