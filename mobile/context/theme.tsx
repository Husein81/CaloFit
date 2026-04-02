import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { ColorScheme, Colors, THEME } from "../lib/theme";

const THEME_KEY = "color_scheme";

type ThemeContextType = {
  colorScheme: ColorScheme;
  colors: Colors;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    Appearance.getColorScheme() === "dark" ? "dark" : "light",
  );
  console.log("Current color scheme:", colorScheme);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((saved) => {
      if (saved === "light" || saved === "dark") {
        applyScheme(saved);
      }
    });
  }, []);

  function applyScheme(scheme: ColorScheme) {
    setColorScheme(scheme);
    Appearance.setColorScheme(scheme);
  }

  function toggleTheme() {
    const next: ColorScheme = colorScheme === "light" ? "dark" : "light";
    applyScheme(next);
    AsyncStorage.setItem(THEME_KEY, next);
  }

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        colors: THEME[colorScheme],
        isDark: colorScheme === "dark",
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
