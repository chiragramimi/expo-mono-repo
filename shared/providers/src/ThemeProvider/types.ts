import { Palette, Theme } from './color';

export type AppThemeContextType = {
  /**
   * The appTheme variable is used to define the color scheme used for the application. It takes a ColorSchemeName as its value.
   */
  appTheme: Theme;
  /**
   * This function is used to set the theme of the application. It takes a single argument, _theme, which should be of type ColorSchemeName.
   * @example setAppTheme('dark');
   * @param theme ColorSchemeName
   * @returns void
   */
  setAppTheme: (theme: Theme) => void;
  /**
   * Get app palette colors.
   */
  color: Palette;
};
