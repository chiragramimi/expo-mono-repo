import React from 'react';
import { View } from 'react-native';

import { Button } from '@shared/blueprint';

import { useHomeScreen } from './useHomeScreen';

const HomeScreen = () => {
  const { homeScreenStyle } = useHomeScreen();
  return (
    <View style={homeScreenStyle.container}>
      <Button title={'HOME'} />
    </View>
  );
};

export default HomeScreen;
