//state type____________________________________
export type UiState = {
  isFetching: boolean;
  theme: ThemeVariant;
  isSidebarOpen: boolean;
  isMobileSidebarOpen: boolean;
};

// INJECT
//payload types_________________________________
export type FillThemeActionPayload = ThemeVariant;

//common types__________________________________
export enum ThemeVariant {
  dark = 'dark',
  light = 'light',
}
