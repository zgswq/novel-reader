import { Theme as MuiTheme } from '@mui/material';

export interface CustomThemeColors {
  reader: {
    background: string;
    text: string;
    border: string;
  };
  bookshelf: {
    cardBackground: string;
    cardHover: string;
    titleText: string;
    authorText: string;
  };
}

export interface CustomTheme extends MuiTheme {
  custom: CustomThemeColors;
}

export type ThemeMode = 'light' | 'dark' | 'sepia';

export interface ThemeSettings {
  mode: ThemeMode;
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
}