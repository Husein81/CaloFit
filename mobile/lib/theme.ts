export const lightColors = {
  primary: "#ff5a36",
  secondary: "#ffe7e1",
  background: "#ffffff",
  foreground: "#1a1a1a",
  card: "#fff5f2",
  cardForeground: "#1a1a1a",
  muted: "#ffe7e1",
  mutedForeground: "#7a2918",
  placeholder: "#a0a0a0",
};

export const darkColors = {
  primary: "#ff7a5c",
  secondary: "#3b1f1a",
  background: "#121212",
  foreground: "#f5f5f5",
  card: "#1e1e1e",
  cardForeground: "#f5f5f5",
  muted: "#2a2a2a",
  mutedForeground: "#c4c4c4",
  placeholder: "#6b6b6b",
};

export type Colors = typeof lightColors;

export const THEME = {
  light: lightColors,
  dark: darkColors,
} as const;

export type ColorScheme = keyof typeof THEME;
