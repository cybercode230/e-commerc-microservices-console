import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text as RNText, TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useThemeColors } from "../hooks/useTheme";

interface ChallengeCategoryCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
  index: number;
  color: string;
  gradient: string[];
  type: "theory" | "practical";
}

export function ChallengeCategoryCard({
  title,
  description,
  icon,
  onPress,
  index,
  color,
  gradient,
  type,
}: ChallengeCategoryCardProps) {
  const colors = useThemeColors();

  return (
    <Animated.View entering={FadeInRight.delay(index * 80).springify()}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="flex-row items-center p-6 mb-5 rounded-[36px] border border-slate-100 shadow-sm"
        style={{
          backgroundColor: colors.card,
        }}
      >
        <LinearGradient
          colors={gradient as any}
          className="w-16 h-16 rounded-[24px] items-center justify-center mr-5 shadow-inner"
        >
          <Ionicons name={icon as any} size={30} color="white" />
        </LinearGradient>

        <View className="flex-1 pr-2">
          <RNText
            style={{
              fontFamily: "Outfit_700Bold",
              fontSize: 18,
              color: colors.text,
              marginBottom: 4,
            }}
          >
            {title}
          </RNText>
          <RNText
            style={{
              fontFamily: "Outfit_500Medium",
              fontSize: 13,
              color: colors.textSecondary,
              opacity: 0.6,
              lineHeight: 18,
              marginBottom: 8,
            }}
            numberOfLines={2}
          >
            {description}
          </RNText>
          <View
            className="px-2.5 py-1 rounded-lg self-start"
            style={{ backgroundColor: color + "15" }}
          >
            <RNText
              style={{
                fontFamily: "Outfit_700Bold",
                fontSize: 10,
                color: color,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {type}
            </RNText>
          </View>
        </View>

        <View className="bg-slate-50 w-10 h-10 rounded-full items-center justify-center border border-slate-100">
          <Ionicons name="chevron-forward" size={18} color={color} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
