import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { useTheme } from '@shared/providers';
import Animated, { Easing, Layout } from 'react-native-reanimated';

import { AnimatedTouchableOpacity, ButtonProps, Text } from '..';

export const Button = React.memo((props: ButtonProps) => {
  const { color } = useTheme();

  const {
    backgroundColor = color.primaryColor,
    borderColor = '#ffffff',
    borderRadius = 0,
    borderWidth = 0,
    buttonContainerStyle,
    disableBackgroundColor = '#d9d9d9',
    isLoading = false,
    loaderStyle,
    loadingColor = 'white',
    requireShadow = false,
    shadowStyle,
    showTitleOnLoading,
    title,
    titleColor = 'black',
    titleContainerStyle,
    titleStyle,
    transitionDuration = 100,
  } = props;

  const styles = buttonStyles();

  return (
    <AnimatedTouchableOpacity
      containerStyle={[
        styles.buttonContainer,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderRadius: borderRadius,
          borderWidth: borderWidth,
        },
        requireShadow && styles.shadow,
        shadowStyle,
        buttonContainerStyle,
        props.disabled && {
          backgroundColor: disableBackgroundColor,
        },
      ]}
      {...props}>
      <Animated.View
        layout={Layout.duration(transitionDuration).easing(Easing.linear)}
        style={[styles.titleContainer, titleContainerStyle]}>
        {props.leftIcon}
        {showTitleOnLoading || !isLoading ? (
          <Text
            preset="h3"
            color={
              (isLoading || props.disabled) && loaderStyle?.titleColor
                ? loaderStyle.titleColor
                : titleColor
            }
            style={titleStyle}>
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
      alignItems: 'center',
      paddingHorizontal: 25,
      paddingVertical: 10,
    },
    loader: {
      marginLeft: 10,
    },
    shadow: {
      elevation: 6,
      shadowOffset: { height: 13, width: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 15,
    },
    titleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });
