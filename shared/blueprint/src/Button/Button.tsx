import React from "react";
import {
  ActivityIndicator,
  ColorValue,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

import Animated, {
  CurvedTransition,
  Easing,
  FadingTransition,
  Layout,
  SlideInLeft,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Text } from "../Text/Text";

const AnimatedButtonComponent =
  Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
  /** Add additional styling for button component. */
  buttonContainerStyle?: StyleProp<ViewStyle>;
  /** Add additional styling for Title container  */
  titleContainerStyle?: StyleProp<ViewStyle>;
  /** Add additional styling for button title */
  titleStyle?: StyleProp<TextStyle>;
  /** Show button title. */
  title?: React.ReactNode;
  /** Display right side icon or component in button */
  rightIcon?: JSX.Element;
  /** Display left side icon or component in button */
  leftIcon?: JSX.Element;
  /** Display loading indicator in button */
  isLoading?: boolean;
  /** Show loading text
   * @default false
   */
  loadingColor?: ColorValue | string;
  showTitleOnLoading?: boolean;
  /** To disable button style */
  loaderStyle?: {
    buttonBackgroundColor?: string;
    titleColor?: string;
    loaderColor?: string;
  };
  /** Set animation duration */
  transitionDuration?: number;
  titleColor?: ColorValue | string;

  backgroundColor?: ColorValue | string;
  borderColor?: ColorValue | string;
  disableBackgroundColor?: ColorValue | string;
  borderWidth?: number;
  borderRadius?: number;
  requireShadow?: boolean;
  shadowStyle?: StyleProp<ViewStyle>;
}

export type AnimatedTouchableOpacityProps = Omit<
  TouchableOpacityProps,
  "onPressIn" | "onPressOut" | "style"
> & {
  containerStyle?: StyleProp<ViewStyle>;
  transitionDuration?: number;
};

export type ButtonProps = AnimatedTouchableOpacityProps & Props;

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
        {...props}
      >
        {props.children}
      </AnimatedButtonComponent>
    );
  }
);

export const Button = React.memo((props: ButtonProps) => {
  const {
    buttonContainerStyle,
    isLoading,
    loaderStyle,
    showTitleOnLoading,
    title,
    titleContainerStyle,
    titleStyle,
    transitionDuration = 100,
    titleColor = "black",
    loadingColor = "white",
    backgroundColor = "#ffffff",
    disableBackgroundColor = "#d9d9d9",
    borderColor = "ffffff",
    borderWidth = 0,
    borderRadius = 0,
    requireShadow = false,
    shadowStyle,
  } = props;

  const styles = buttonStyles();

  return (
    <AnimatedTouchableOpacity
      containerStyle={[
        styles.buttonContainer,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
          borderRadius: borderRadius,
        },
        requireShadow && styles.shadow,
        shadowStyle,
        buttonContainerStyle,
        props.disabled && {
          backgroundColor: disableBackgroundColor,
        },
      ]}
      {...props}
    >
      <Animated.View
        layout={Layout.duration(transitionDuration).easing(Easing.linear)}
        style={[styles.titleContainer, titleContainerStyle]}
      >
        {props.leftIcon}
        {showTitleOnLoading || !isLoading ? (
          <Text
            preset="h3"
            color={
              (isLoading || props.disabled) && loaderStyle?.titleColor
                ? loaderStyle.titleColor
                : titleColor
            }
            style={[
              (props.leftIcon || props.rightIcon) && {
                marginHorizontal: 8,
              },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        ) : null}
        {isLoading ? (
          <ActivityIndicator
            color={
              (isLoading || props.disabled) && loaderStyle?.loaderColor
                ? loaderStyle.loaderColor
                : loadingColor
            }
            style={showTitleOnLoading && styles.loader}
          />
        ) : null}
        {props.rightIcon}
      </Animated.View>
    </AnimatedTouchableOpacity>
  );
});

const buttonStyles = () =>
  StyleSheet.create({
    buttonContainer: {
      alignItems: "center",
      paddingHorizontal: 25,
      paddingVertical: 10,
    },
    loader: {
      marginLeft: 10,
    },
    titleContainer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    shadow: {
      shadowColor: "rgba(0, 0, 0, 0.1)",
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15,
      shadowOffset: { width: 1, height: 13 },
    },
  });
