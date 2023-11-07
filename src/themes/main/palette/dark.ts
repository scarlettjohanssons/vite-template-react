import { PaletteOptions } from '@mui/material/styles/createPalette';

export const dark: PaletteOptions = {
  mode: 'dark',
  common: {
    white: 'rgb(255, 255, 255)',
    red: '#FF6565',
    green: '#65FF74',
    test: '#FF6565',
  },
};
// types
declare module '@mui/material/styles/createPalette' {
  export interface CommonColors {
    white: string;
    red: string;
    green: string;
    test: string;
  }
  export interface PaletteOptions {
    common?: Partial<CommonColors>;
  }
}
