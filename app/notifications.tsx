import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../components/Text";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import {
    deleteNotification,
    markAllAsRead,
    markAsRead,
} from "../store/slices/notificationSlice";
import type { AppNotification } from "../types/challenge";

function NotificationItem({ notification }: { notification: AppNotification }) {
  const dispatch = useAppDispatch();

  const handlePress = () => {
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }
  };

  const handleDelete = () => {
    dispatch(deleteNotification(notification.id));
  };

  const iconName =
    {
      challenge: "code-slash",
      streak: "flame",
      achievement: "trophy",
      system: "information-circle",
    }[notification.type] || "notifications";

  const iconColor =
    {
      challenge: "#4f46e5",
      streak: "#ea580c",
      achievement: "#eab308",
      system: "#64748b",
    }[notification.type] || "#64748b";

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`px-6 py-4 border-b border-slate-100 ${
        !notification.read ? "bg-indigo-50/30" : "bg-white"
      }`}
    >
      <View className="flex-row items-start">
        <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center mr-3">
          <Ionicons name={iconName as any} size={20} color={iconColor} />
        </View>
        <View className="flex-1">
          <View className="flex-row items-start justify-between mb-1">
            <Text variant="bold" className="text-slate-900 flex-1">
              {notification.title}
            </Text>
            {!notification.read && (
              <View className="w-2 h-2 bg-indigo-600 rounded-full ml-2 mt-1.5" />
            )}
          </View>
          <Text className="text-slate-600 text-sm mb-2">
            {notification.message}
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-slate-400 text-xs">
              {new Date(notification.timestamp).toLocaleString()}
            </Text>
            <TouchableOpacity onPress={handleDelete} className="p-1">
              <Ionicons name="trash-outline" size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Notifications() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notifications, unreadCount } = useAppSelector(
    (state) => state.notifications,
  );

  const handleMarkAllRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="px-6 py-4 border-b border-slate-100">
        <View className="flex-row items-center justify-between mb-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#334155" />
          </TouchableOpacity>
          <Text variant="bold" className="text-lg text-slate-900">
            Notifications
          </Text>
          <View style={{ width: 28 }} />
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity
            onPress={handleMarkAllRead}
            className="self-end mt-2"
          >
            <Text className="text-indigo-600 text-sm font-medium">
              Mark all as read
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-20 h-20 rounded-full bg-slate-100 items-center justify-center mb-4">
            <Ionicons name="notifications-outline" size={40} color="#94a3b8" />
          </View>
          <Text variant="bold" className="text-xl text-slate-900 mb-2">
            No notifications
          </Text>
          <Text className="text-slate-500 text-center">
            You're all caught up! Check back later for updates.
          </Text>
        </View>
      ) : (
        <ScrollView>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
