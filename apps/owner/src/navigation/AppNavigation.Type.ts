import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum Screen {
  HOME = 'HOME',
  DETAIL = 'DETAIL',
}

export type NavStackParams = {
  [Screen.HOME]: undefined;
  [Screen.DETAIL]: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<NavStackParams>;

export type DetailRoute = RouteProp<NavStackParams, Screen.DETAIL>;
