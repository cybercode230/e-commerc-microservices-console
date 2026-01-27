import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  recentSearches: string[];
}

const initialState: SearchState = {
  recentSearches: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearchTerm: (state, action: PayloadAction<string>) => {
      const term = action.payload.trim();
      if (!term) return;

      // Remove term if it already exists to move it to the front
      state.recentSearches = state.recentSearches.filter((s) => s !== term);

      // Add to front
      state.recentSearches.unshift(term);

      // Limit to 10 recent searches
      if (state.recentSearches.length > 10) {
        state.recentSearches.pop();
      }
    },
    removeSearchTerm: (state, action: PayloadAction<string>) => {
      state.recentSearches = state.recentSearches.filter(
        (s) => s !== action.payload,
      );
    },
    clearHistory: (state) => {
      state.recentSearches = [];
    },
  },
});

export const { addSearchTerm, removeSearchTerm, clearHistory } =
  searchSlice.actions;
export default searchSlice.reducer;
