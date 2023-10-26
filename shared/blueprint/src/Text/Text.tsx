import React, { LegacyRef } from 'react';
import {
  ColorValue,
  // eslint-disable-next-line no-restricted-imports
  Text as RNText,
  StyleProp,
  TextProps as TextProperties,
  TextStyle,
} from 'react-native';

const BASE_TEXT: TextStyle = {
  fontSize: 7,
};

export const presets = {
  default: BASE_TEXT,
  h1: {
    ...BASE_TEXT,
    fontSize: 24,
    fontWeight: '700',
  } as TextStyle,
  h2: {
    ...BASE_TEXT,
    fontSize: 21,
    fontWeight: '700',
  } as TextStyle,
  h3: {
    ...BASE_TEXT,
    fontSize: 18,
    fontWeight: '500',
  } as TextStyle,
  h4: {
    ...BASE_TEXT,
    fontSize: 15,
    fontWeight: '500',
  } as TextStyle,
  h5: {
    ...BASE_TEXT,
    fontSize: 12,
    fontWeight: '300',
  } as TextStyle,
  h6: {
    ...BASE_TEXT,
    fontSize: 9,
    fontWeight: '300',
  } as TextStyle,
  small: {
    ...BASE_TEXT,
    fontSize: 6,
    fontWeight: '300',
  } as TextStyle,
  title: {
    ...BASE_TEXT,
    fontSize: 13,
    fontWeight: '700',
  } as TextStyle,
};

export type TextPresets = keyof typeof presets;

export type TextRef = LegacyRef<RNText>;
export type RefText = InstanceType<typeof RNText>;

export interface TextProps extends TextProperties {
  /** Add additional styling for Text. */
  style?: StyleProp<TextStyle>;
  /** Select font and font weight */
  preset?: TextPresets;
  /** Set text color */
  color?: string | ColorValue;
}

export type RefTextType = InstanceType<typeof RNText>;

const TextLabel = (
  { children, preset = 'default', ...props }: TextProps,
  ref: TextRef
) => {
  const { color = '#000000', style: styleOverride, ...rest } = props;

  return (
    <RNText
      ref={ref}
      {...rest}
      style={[presets[preset] as TextProps, { color: color }, styleOverride]}>
      {children}
    </RNText>
  );
};

export const Text = React.memo(
  React.forwardRef<RefTextType, TextProps>(TextLabel)
);
