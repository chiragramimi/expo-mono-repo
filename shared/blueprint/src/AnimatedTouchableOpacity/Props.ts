import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

export type AnimatedTouchableOpacityProps = Omit<
  TouchableOpacityProps,
  'onPressIn' | 'onPressOut' | 'style'
> & {
  containerStyle?: StyleProp<ViewStyle>;
  transitionDuration?: number;
};
