import {
  ColorValue,
  StyleProp,
  TextProps as TextProperties,
  TextStyle,
} from 'react-native';

import { TextPresets } from './Text';

export interface TextProps extends TextProperties {
  /** Add additional styling for Text. */
  style?: StyleProp<TextStyle>;
  /** Select font and font weight */
  preset?: TextPresets;
  /** Set text color */
  color?: string | ColorValue;
}
