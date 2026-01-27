import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text as RNText, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../hooks/useTheme";

interface ChallengeOptionProps {
  label: string;
  description?: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function ChallengeOption({
  label,
  description,
  isSelected,
  onSelect,
}: ChallengeOptionProps) {
  const colors = useThemeColors();

  const fontFamily = isSelected ? "Outfit_700Bold" : "Outfit_400Regular";

  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.8}
      className={`p-5 mb-3 rounded-2xl border-2 flex-row items-center ${
        isSelected ? "shadow-md" : ""
      }`}
      style={{
        backgroundColor: isSelected ? colors.primaryLight + "10" : colors.card,
        borderColor: isSelected ? colors.primary : colors.border,
      }}
    >
      <View className="flex-1">
        <RNText
          style={{
            color: isSelected ? colors.primary : colors.text,
            fontFamily,
            fontSize: 16,
          }}
        >
          {label}
        </RNText>
        {description && (
          <RNText
            style={{
              color: colors.textSecondary,
              fontFamily: "Outfit_400Regular",
              fontSize: 14,
              marginTop: 2,
            }}
          >
            {description}
          </RNText>
        )}
      </View>
      <View
        className={`w-6 h-6 rounded-full border-2 items-center justify-center`}
        style={{
          backgroundColor: isSelected ? colors.primary : "transparent",
          borderColor: isSelected ? colors.primary : colors.border,
        }}
      >
        {isSelected && <Ionicons name="checkmark" size={14} color="white" />}
      </View>
    </TouchableOpacity>
  );
}
