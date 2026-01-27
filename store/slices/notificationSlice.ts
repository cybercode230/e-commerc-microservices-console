import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppNotification } from "../../types/challenge";

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
}

const initialState: NotificationState = {
  notifications: [
    {
      id: "1",
      title: "Daily Challenge Ready!",
      message: "Your new coding challenge is waiting",
      timestamp: Date.now() - 1800000,
      read: false,
      type: "challenge",
    },
    {
      id: "2",
      title: "7-Day Streak! 🔥",
      message: "Amazing! You've maintained your streak for a week",
      timestamp: Date.now() - 86400000,
      read: false,
      type: "streak",
    },
    {
      id: "3",
      title: "New Achievement Unlocked",
      message: "You've completed 10 algorithm challenges",
      timestamp: Date.now() - 172800000,
      read: true,
      type: "achievement",
    },
  ],
  unreadCount: 2,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<Omit<AppNotification, "id">>,
    ) => {
      const newNotification: AppNotification = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.notifications.unshift(newNotification);
      if (!newNotification.read) {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload,
      );
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
      state.unreadCount = 0;
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload,
      );
      if (notification && !notification.read) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
    },
    clearAll: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAll,
} = notificationSlice.actions;
export default notificationSlice.reducer;
