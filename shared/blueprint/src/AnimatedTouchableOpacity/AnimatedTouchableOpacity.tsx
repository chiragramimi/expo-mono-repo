import React from 'react';
import { TouchableOpacity } from 'react-native';

import Animated, {
  Easing,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { AnimatedTouchableOpacityProps } from './AnimatedTouchableOpacity.types';

const AnimatedButtonComponent =
  Animated.createAnimatedComponent(TouchableOpacity);

export const AnimatedTouchableOpacity = React.memo(
  (props: AnimatedTouchableOpacityProps) => {
    const { containerStyle, transitionDuration = 100 } = props;
    const scaleValue = useSharedValue(1);

    const animatedButtonStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scaleValue.value }],
      };
    }, [scaleValue.value]);

    return (
      <AnimatedButtonComponent
        style={[containerStyle, animatedButtonStyle]}
        layout={Layout.duration(transitionDuration).easing(Easing.linear)}
        onPressIn={() => (scaleValue.value = withSpring(0.9))}
        onPressOut={() => (scaleValue.value = withSpring(1))}
        activeOpacity={0.8}
        {...props}>
        {props.children}
      </AnimatedButtonComponent>
    );
  }
);
