import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setActiveTheme } from "../store/slices/themeSlice";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const deviceColorScheme = useColorScheme();
  const themeMode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    // Update active theme based on mode
    if (themeMode === "device") {
      // Follow device theme
      dispatch(setActiveTheme(deviceColorScheme === "dark" ? "dark" : "light"));
    } else {
      // Use selected theme
      dispatch(setActiveTheme(themeMode));
    }
  }, [themeMode, deviceColorScheme, dispatch]);

  return <>{children}</>;
}
