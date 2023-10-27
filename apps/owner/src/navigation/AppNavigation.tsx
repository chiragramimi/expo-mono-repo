import React from 'react';

import { NavigationContainerRef } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { NavStackParams, Screen } from './AppNavigation.Type';
import { HomeScreen } from '../screens';

export const navigationRef =
  React.createRef<NavigationContainerRef<NavStackParams>>();

const Stack = createNativeStackNavigator<NavStackParams>();

const screenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
};

export const AppNavigation = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={Screen.HOME}>
        <Stack.Screen name={Screen.HOME} component={HomeScreen} />
      </Stack.Navigator>
    </>
  );
};
