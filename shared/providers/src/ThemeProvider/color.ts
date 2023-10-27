import { ColorSchemeName } from 'react-native/types';

export const color = {
  dark: {
    backgroundColor: '#212121',
    black: 'black',
    error: '#BE002C',
    primaryColor: '#0a84ff',
    secondaryColor: '#dcdcdc',
    white: 'white',
  },
  light: {
    backgroundColor: '#212121',
    black: 'black',
    error: '#BE002C',
    primaryColor: '#0a84ff',
    secondaryColor: '#dcdcdc',
    white: 'white',
  },
};

export type Palette = (typeof color)[keyof typeof color];

export type Theme = ColorSchemeName | keyof typeof color;
