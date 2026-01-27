import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MOCK_CHALLENGES } from "../../constants/categories";
import settingData from "../../constants/setting_data.json";
import type { CategoryType, Challenge } from "../../types/challenge";

interface ChallengeState {
  challenges: Challenge[];
  selectedCategory: CategoryType | "all";
  selectedSubCategory: string | null;
}

// Map onboarding items to formal Challenges
const onboardingChallenges: Challenge[] = settingData.onboarding.map(
  (item) => ({
    id: `onboarding-${item.id}`,
    title: item.title,
    description: item.subtitle,
    category: "real-world", // Consistent with Challenge types
    subCategory: "getting-started",
    difficulty: "beginner",
    rating: 4.9,
    estimatedTime: 10,
    xpReward: 100,
  }),
);

const initialState: ChallengeState = {
  challenges: [...onboardingChallenges, ...MOCK_CHALLENGES],
  selectedCategory: "all",
  selectedSubCategory: null,
};

const challengeSlice = createSlice({
  name: "challenges",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryType | "all">) => {
      state.selectedCategory = action.payload;
      state.selectedSubCategory = null;
    },
    setSubCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedSubCategory = action.payload;
    },
    addChallenge: (state, action: PayloadAction<Challenge>) => {
      state.challenges.push(action.payload);
    },
  },
});

export const { setCategory, setSubCategory, addChallenge } =
  challengeSlice.actions;
export default challengeSlice.reducer;
