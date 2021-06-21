import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export const LightSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      className="LightSwitchButton"
      mr={2}
      aria-label="Toggle Darkmode"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      boxShadow={colorMode === "light" ? "dark-lg" : "light-lg"}
      onClick={toggleColorMode}
    />
  );
};
