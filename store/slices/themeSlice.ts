import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark" | "device";
export type ActiveTheme = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  activeTheme: ActiveTheme;
}

const initialState: ThemeState = {
  mode: "device",
  activeTheme: "light", // Will be updated based on device
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    setActiveTheme: (state, action: PayloadAction<ActiveTheme>) => {
      state.activeTheme = action.payload;
    },
  },
});

export const { setThemeMode, setActiveTheme } = themeSlice.actions;
export default themeSlice.reducer;
