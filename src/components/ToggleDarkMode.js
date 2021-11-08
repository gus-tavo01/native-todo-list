import React from 'react';
import { Text, HStack, Switch, useColorMode } from 'native-base';

const ToggleDarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch isChecked={colorMode === 'light'} onToggle={toggleColorMode} />
      <Text>Light</Text>
    </HStack>
  );
};

// wrap in this component
{
  /* <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={4} flex={1}>
      </Center> */
}

export default ToggleDarkMode;
