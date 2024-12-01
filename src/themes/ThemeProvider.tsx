import React, { useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { useThemeStore } from '../store/useThemeStore';
import { lightTheme, darkTheme, sepiaTheme } from './tokens';
import { CustomTheme } from './types';
import { useSystemTheme } from '../hooks/useSystemTheme';

const themeMap = {
  light: lightTheme,
  dark: darkTheme,
  sepia: sepiaTheme,
};

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, syncWithSystem, updateSettings } = useThemeStore();
  const systemTheme = useSystemTheme();
  
  useEffect(() => {
    if (syncWithSystem && systemTheme !== settings.mode && systemTheme !== 'sepia') {
      updateSettings({ mode: systemTheme });
    }
  }, [systemTheme, syncWithSystem, settings.mode, updateSettings]);

  const theme = React.useMemo(() => {
    const selectedTheme = themeMap[settings.mode];
    return createTheme({
      ...selectedTheme,
      typography: {
        fontFamily: settings.fontFamily,
        fontSize: settings.fontSize,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
            },
          },
        },
      },
    }) as CustomTheme;
  }, [settings]);

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
};