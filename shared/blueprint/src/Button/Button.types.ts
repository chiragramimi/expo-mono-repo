import { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { AnimatedTouchableOpacityProps } from '..';

// Interface for additional properties specific to the Button component
export interface ButtonExtraProps {
  /** Add additional styling for the button container. */
  buttonContainerStyle?: StyleProp<ViewStyle>;
  /** Add additional styling for the title container. */
  titleContainerStyle?: StyleProp<ViewStyle>;
  /** Add additional styling for the button title. */
  titleStyle?: StyleProp<TextStyle>;
  /** The text to be displayed as the button title. */
  title?: React.ReactNode;
  /** Display a right-side icon or component in the button. */
  rightIcon?: JSX.Element;
  /** Display a left-side icon or component in the button. */
  leftIcon?: JSX.Element;
  /** Display a loading indicator in the button. */
  isLoading?: boolean;
  /** Show loading text (default is false). */
  loadingColor?: ColorValue | string;
  showTitleOnLoading?: boolean;
  /** Styling options for the loading state. */
  loaderStyle?: {
    buttonBackgroundColor?: string;
    titleColor?: string;
    loaderColor?: string;
  };
  /** Set animation duration for transitions. */
  transitionDuration?: number;
  titleColor?: ColorValue | string;

  /** Styling options for the button's appearance. */
  backgroundColor?: ColorValue | string;
  borderColor?: ColorValue | string;
  disableBackgroundColor?: ColorValue | string;
  borderWidth?: number;
  borderRadius?: number;
  requireShadow?: boolean;
  shadowStyle?: StyleProp<ViewStyle>;
}

// Combine the ButtonExtraProps with the props for AnimatedTouchableOpacity
export type ButtonProps = AnimatedTouchableOpacityProps & ButtonExtraProps;
