import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserPreferences {
  goal: string;
  level: string;
  categories: string[];
  thinkingStyle: string;
  dailyTimeCount: number;
  pace: string;
}

export interface SubCategoryConfig {
  difficulty: number;
  timePerChallenge: number;
  thinkingStyle: string;
  intensity: number;
  isConfigured: boolean;
}

interface PreferencesState {
  global: UserPreferences;
  subCategoryConfigs: Record<string, SubCategoryConfig>;
  isFirstTimeSetup: boolean;
}

const initialState: PreferencesState = {
  global: {
    goal: "",
    level: "beginner",
    categories: [],
    thinkingStyle: "",
    dailyTimeCount: 15,
    pace: "balanced",
  },
  subCategoryConfigs: {},
  isFirstTimeSetup: true,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setGlobalPreferences: (
      state,
      action: PayloadAction<Partial<UserPreferences>>,
    ) => {
      state.global = { ...state.global, ...action.payload };
      state.isFirstTimeSetup = false;
    },
    setSubCategoryConfig: (
      state,
      action: PayloadAction<{ id: string; config: SubCategoryConfig }>,
    ) => {
      state.subCategoryConfigs[action.payload.id] = action.payload.config;
    },
    resetPreferences: (state) => {
      state.global = initialState.global;
      state.subCategoryConfigs = {};
      state.isFirstTimeSetup = true;
    },
  },
});

export const { setGlobalPreferences, setSubCategoryConfig, resetPreferences } =
  preferencesSlice.actions;
export default preferencesSlice.reducer;
