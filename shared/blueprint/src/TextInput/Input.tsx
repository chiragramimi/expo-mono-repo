import React, { useCallback, useMemo } from "react";
import {
  NativeSyntheticEvent,
  Platform,
  TextInput as RNTextInput,
  StyleProp,
  StyleSheet,
  TargetedEvent,
  Text,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { InputProps } from "./TextInputProps";

const AnimatedTextInput = Animated.createAnimatedComponent(RNTextInput);

export const Input = React.memo(
  React.forwardRef((props: InputProps, ref?: React.Ref<RNTextInput | null>) => {
    const {
      variant = "filled",
      label,
      leftIcon,
      rightIcon,
      error,
      onMouseEnter,
      onMouseLeave,
      style,
      inputContainerStyle,
      inputStyle,
      leftIconContainerStyle,
      rightIconContainerStyle,
      placeholder,
      onFocus,
      onBlur,
      backgroundColor = "white",
      onFocusBackgroundColor = "#e9e9e9",
      borderColor = "black",
      onFocusBorderColor = "#0c5fed",
      onHoverBackgroundColor = "#e9e9e9",
      labelColor = "black",
      onFocusLabelColor = "#0c5fed",
      errorContainerStyle,
      errorStyle,
      outlineGapColor = "white",
      ...rest
    } = props;

    const hovered = useSharedValue(false);
    const focused = useSharedValue(false);

    const handleMouseEnter = useCallback(
      (event: NativeSyntheticEvent<TargetedEvent>) => {
        onMouseEnter?.(event);
        hovered.value = true;
      },
      [onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (event: NativeSyntheticEvent<TargetedEvent>) => {
        onMouseLeave?.(event);
        hovered.value = false;
      },
      [onMouseLeave]
    );

    const handleFocus = useCallback(
      (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus?.(event);
        focused.value = true;
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(event);
        focused.value = false;
      },
      [onBlur]
    );

    const focusAnimation = useSharedValue(0);

    useDerivedValue(() => {
      focusAnimation.value = withTiming(focused.value ? 1 : 0, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
    }, [focused.value, focusAnimation.value]);

    const active = useDerivedValue(
      () => focused.value || (rest.value?.length || 0) > 0,
      [focused.value, rest.value]
    );

    const activeAnimation = useSharedValue(0);

    useDerivedValue(() => {
      activeAnimation.value = withTiming(active.value ? 1 : 0, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
    }, [active.value, activeAnimation.value]);

    const animatedInputContainerStyle = useAnimatedStyle(() => {
      return {
        backgroundColor:
          variant === "filled"
            ? focused.value
              ? onFocusBackgroundColor
              : hovered.value
              ? onHoverBackgroundColor
              : backgroundColor
            : variant === "outlined"
            ? backgroundColor
            : backgroundColor,
        borderTopStartRadius: 4,
        borderTopEndRadius: 4,
        borderBottomStartRadius: variant !== "standard" ? 4 : 0,
        borderBottomEndRadius: variant !== "standard" ? 4 : 0,
      };
    }, [focused.value, hovered.value, variant]);

    const animatedInput = useAnimatedStyle(() => {
      return {
        fontSize: 16,
        paddingTop: variant === "filled" && label ? 18 : 0,
        minHeight: variant === "standard" ? 48 : 56,
        paddingStart: leftIcon ? 12 : variant === "standard" ? 0 : 16,
        paddingEnd: rightIcon ? 12 : variant === "standard" ? 0 : 16,
      };
    }, [variant, leftIcon, rightIcon]);

    const animatedLeading = useAnimatedStyle(() => {
      return {
        marginStart: variant === "standard" ? 0 : 12,
        marginVertical: variant === "standard" ? 12 : 16,
      };
    }, [variant]);

    const animatedTrailing = useAnimatedStyle(() => {
      return {
        marginEnd: variant === "standard" ? 0 : 12,
        marginVertical: variant === "standard" ? 12 : 16,
      };
    }, [variant]);

    const animatedOutline = useAnimatedStyle(() => {
      return {
        borderWidth: focused.value ? 2 : 1,
        borderColor: focused.value
          ? onFocusBorderColor
          : hovered.value
          ? onFocusBorderColor
          : borderColor,
        borderTopStartRadius: 4,
        borderTopEndRadius: 4,
        borderBottomStartRadius: 4,
        borderBottomEndRadius: 4,
      };
    }, [focused.value, hovered.value]);

    const animatedOutlineLabelGap = useAnimatedStyle(() => {
      return {
        height: focused.value ? 2 : 1,
      };
    }, [focused.value]);

    const animatedLabelContainer = useAnimatedStyle(() => {
      return {
        start:
          variant === "standard" ? (leftIcon ? 36 : 0) : leftIcon ? 48 : 16,
        height: variant === "standard" ? 48 : 56,
      };
    }, [variant, leftIcon]);

    const animatedLabel = useAnimatedStyle(() => {
      return {
        color: interpolateColor(
          focusAnimation.value,
          [0, 1],
          [labelColor, onFocusLabelColor]
        ),
        fontSize: interpolate(activeAnimation.value, [0, 1], [16, 12]),
        transform: [
          {
            translateY: interpolate(
              activeAnimation.value,
              [0, 1],
              [
                0,
                variant === "filled" ? -12 : variant === "outlined" ? -28 : -24,
              ]
            ),
          },
        ],
      };
    }, [focusAnimation, activeAnimation]);

    const animatedPlaceholder = useAnimatedProps<TextInputProps>(() => {
      return {
        placeholder: label ? (focused.value ? placeholder : "") : placeholder,
        placeholderTextColor: "#d5d5",
      };
    }, [label, focused, placeholder]);

    const animatedUnderline = useAnimatedStyle(() => {
      return {
        transform: [{ scaleX: focusAnimation.value }],
        backgroundColor: interpolateColor(
          focusAnimation.value,
          [0, 1],
          [borderColor, onFocusBorderColor]
        ),
      };
    }, [focusAnimation.value]);

    const animatedOutlineLabel = useAnimatedStyle(() => {
      return {
        transform: [{ scaleX: activeAnimation.value }],
        backgroundColor: interpolateColor(
          activeAnimation.value,
          [0, 1],
          [backgroundColor, outlineGapColor]
        ),
      };
    }, [activeAnimation.value]);

    return (
      <View style={[style]}>
        <Animated.View
          style={[
            styles.inputContainer,
            animatedInputContainerStyle,
            inputContainerStyle,
          ]}
        >
          {leftIcon && (
            <Animated.View
              style={[styles.leading, animatedLeading, leftIconContainerStyle]}
            >
              {leftIcon}
            </Animated.View>
          )}

          <AnimatedTextInput
            ref={ref}
            style={[styles.input, animatedInput, inputStyle]}
            animatedProps={animatedPlaceholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...({
              onMouseEnter: handleMouseEnter,
              onMouseLeave: handleMouseLeave,
              ...rest,
            } as any)}
          />

          {rightIcon && (
            <Animated.View
              style={[
                styles.trailing,
                animatedTrailing,
                rightIconContainerStyle,
              ]}
            >
              {rightIcon}
            </Animated.View>
          )}

          {(variant === "filled" || variant === "standard") && (
            <>
              <View
                style={[styles.underline, { backgroundColor: borderColor }]}
                pointerEvents="none"
              />
              <Animated.View
                style={[styles.underlineFocused, animatedUnderline]}
                pointerEvents="none"
              />
            </>
          )}

          {variant === "outlined" && (
            <Animated.View
              style={[StyleSheet.absoluteFill, animatedOutline, styles.outline]}
              pointerEvents="none"
            />
          )}

          {label ? (
            <Animated.View
              style={[styles.labelContainer, animatedLabelContainer]}
              pointerEvents="none"
            >
              {variant === "outlined" && (
                <Animated.View
                  style={[
                    styles.outlineLabelGap,
                    animatedOutlineLabel,
                    animatedOutlineLabelGap,
                  ]}
                />
              )}
              <Animated.Text style={[animatedLabel]}>{label}</Animated.Text>
            </Animated.View>
          ) : null}
        </Animated.View>
        <View style={[styles.errorView, errorContainerStyle]}>
          {error ? (
            <Text style={[styles.helperText, errorStyle]}>{error}</Text>
          ) : null}
        </View>
      </View>
    );
  })
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    ...Platform.select({
      web: {
        outlineStyle: "none",
      },
    }),
  },
  leading: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
  },
  trailing: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
  },
  underline: {
    position: "absolute",
    start: 0,
    end: 0,
    bottom: 0,
    height: 1,
  },
  underlineFocused: {
    position: "absolute",
    start: 0,
    end: 0,
    bottom: 0,
    height: 2,
  },
  outline: {},
  outlineLabelGap: {
    position: "absolute",
    top: 0,
    start: -4,
    end: -4,
    backgroundColor: "white",
  },
  labelContainer: {
    justifyContent: "center",
    position: "absolute",
    top: 0,
  },
  helperText: {
    fontSize: 14,
  },
  errorView: {
    marginTop: 4,
    marginHorizontal: 16,
  },
});
