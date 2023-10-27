import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

import { color, Theme } from './color';
import { AppThemeContextType } from './ThemeContext.types';

export const ThemeContext = createContext<AppThemeContextType | undefined>(
  undefined
);

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) throw Error('useColor must be used inside ThemeProvider');
  return theme;
};

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const colorScheme = useColorScheme();

  const [appTheme, setTheme] = useState<Theme>(colorScheme);

  /**
   * For setAppTheme change app theming.
   * setTheme(ColorSchemeName)
   * @return void change app Theme.
   */
  const setAppTheme = useCallback((theme: Theme) => {
    setTheme(theme);
  }, []);

  const value: AppThemeContextType = useMemo(() => {
    return {
      appTheme,
      color: color[appTheme || 'light'],
      setAppTheme,
    };
  }, [appTheme, setAppTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
