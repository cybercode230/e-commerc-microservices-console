import { useAppSelector } from "./useRedux";

export type ThemeColors = {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  borderLight: string;
  primary: string;
  primaryLight: string;
  success: string;
  warning: string;
  error: string;
};

export const lightColors: ThemeColors = {
  background: "#ffffff",
  surface: "#f8fafc",
  card: "#ffffff",
  text: "#0f172a",
  textSecondary: "#64748b",
  textTertiary: "#94a3b8",
  border: "#e2e8f0",
  borderLight: "#f1f5f9",
  primary: "#4f46e5",
  primaryLight: "#818cf8",
  success: "#059669",
  warning: "#f59e0b",
  error: "#dc2626",
};

export const darkColors: ThemeColors = {
  background: "#0f172a",
  surface: "#1e293b",
  card: "#334155",
  text: "#f1f5f9",
  textSecondary: "#cbd5e1",
  textTertiary: "#94a3b8",
  border: "#475569",
  borderLight: "#334155",
  primary: "#818cf8",
  primaryLight: "#a5b4fc",
  success: "#10b981",
  warning: "#fbbf24",
  error: "#ef4444",
};

export function useThemeColors(): ThemeColors {
  const activeTheme = useAppSelector((state) => state.theme.activeTheme);
  return activeTheme === "dark" ? darkColors : lightColors;
}
