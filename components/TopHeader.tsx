import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "../hooks/useRedux";
import { useThemeColors } from "../hooks/useTheme";
import { SearchOverlay } from "./SearchOverlay";
import { Text } from "./Text";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export function TopHeader() {
  const router = useRouter();
  const colors = useThemeColors();
  const unreadCount = useAppSelector(
    (state) => state.notifications.unreadCount,
  );

  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <View className="z-[100]">
      <View
        className="flex-row items-center justify-between px-6 py-4 border-b bg-white border-slate-100"
        style={{ height: 70 }}
      >
        {/* Left: Logo */}
        <View className="flex-row items-center">
          <Image
            source={require("../assets/images/techmindLogo.png")}
            style={{ width: 32, height: 32 }}
            contentFit="contain"
          />
          <Text variant="bold" className="ml-2 text-xl text-slate-900">
            TechMind
          </Text>
        </View>

        {/* Right: Actions Grouped */}
        <View className="flex-row items-center gap-5">
          <TouchableOpacity onPress={() => setIsSearchActive(true)}>
            <Ionicons name="search-outline" size={24} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity
            className="relative"
            onPress={() => router.push("/notifications" as any)}
          >
            <Ionicons name="notifications-outline" size={26} color="#475569" />
            {unreadCount > 0 && (
              <View className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full items-center justify-center px-1">
                <Text className="text-white text-[10px] font-bold">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/profile" as any)}>
            <View className="w-9 h-9 rounded-full bg-indigo-100 items-center justify-center border border-indigo-200">
              <Text className="text-indigo-600 font-bold text-sm">TM</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Overlay */}
      <SearchOverlay
        isVisible={isSearchActive}
        onClose={() => setIsSearchActive(false)}
      />
    </View>
  );
}
