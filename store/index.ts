import { configureStore } from "@reduxjs/toolkit";
import challengeReducer from "./slices/challengeSlice";
import notificationReducer from "./slices/notificationSlice";
import preferencesReducer from "./slices/preferencesSlice";
import searchReducer from "./slices/searchSlice";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notificationReducer,
    challenges: challengeReducer,
    theme: themeReducer,
    search: searchReducer,
    preferences: preferencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
