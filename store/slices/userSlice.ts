import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserProgress } from "../../types/challenge";

interface UserState {
  profile: {
    name: string;
    username: string;
    avatar?: string;
    techPath: string;
  };
  progress: UserProgress;
  recentActivity: Array<{
    id: string;
    title: string;
    timestamp: number;
  }>;
}

const initialState: UserState = {
  profile: {
    name: "TechMind User",
    username: "@techmind",
    techPath: "Coding",
  },
  progress: {
    level: 5,
    xp: 1250,
    streak: 7,
    skillBreakdown: {
      coding: 65,
      cyber: 20,
      math: 15,
      "system-design": 40,
      logic: 75,
      algorithms: 55,
      "real-world": 30,
    },
  },
  recentActivity: [
    {
      id: "1",
      title: 'Completed "Binary Search Challenge"',
      timestamp: Date.now() - 3600000,
    },
    {
      id: "2",
      title: 'Solved "Logic Grid Puzzle"',
      timestamp: Date.now() - 7200000,
    },
    {
      id: "3",
      title: "7-day streak maintained",
      timestamp: Date.now() - 86400000,
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (
      state,
      action: PayloadAction<Partial<UserState["profile"]>>,
    ) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    addXP: (state, action: PayloadAction<number>) => {
      state.progress.xp += action.payload;
      // Simple level calculation: every 500 XP = 1 level
      state.progress.level = Math.floor(state.progress.xp / 500) + 1;
    },
    updateStreak: (state, action: PayloadAction<number>) => {
      state.progress.streak = action.payload;
    },
    updateSkill: (
      state,
      action: PayloadAction<{
        skill: keyof UserProgress["skillBreakdown"];
        value: number;
      }>,
    ) => {
      state.progress.skillBreakdown[action.payload.skill] =
        action.payload.value;
    },
    addActivity: (state, action: PayloadAction<{ title: string }>) => {
      state.recentActivity.unshift({
        id: Date.now().toString(),
        title: action.payload.title,
        timestamp: Date.now(),
      });
      // Keep only last 10 activities
      if (state.recentActivity.length > 10) {
        state.recentActivity = state.recentActivity.slice(0, 10);
      }
    },
  },
});

export const { updateProfile, addXP, updateStreak, updateSkill, addActivity } =
  userSlice.actions;
export default userSlice.reducer;
