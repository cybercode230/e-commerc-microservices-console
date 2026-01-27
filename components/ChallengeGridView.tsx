import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    Dimensions,
    Text as RNText,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import { CATEGORIES, SUB_CATEGORIES_DATA } from "../constants/categories";
import { SubCategory } from "../types/challenge";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GRID_SPACING = 12;
const PADDING_HORIZONTAL = 24;
const ITEM_SIZE =
  (SCREEN_WIDTH - PADDING_HORIZONTAL * 2 - GRID_SPACING * 2) / 3;

interface ChallengeGridViewProps {
  onPressSubCategory: (sub: SubCategory) => void;
}

export function ChallengeGridView({
  onPressSubCategory,
}: ChallengeGridViewProps) {
  return (
    <View className="flex-1">
      {CATEGORIES.map((category) => {
        const subCats = SUB_CATEGORIES_DATA.filter(
          (s) => s.parentCategory === category.id,
        );
        if (subCats.length === 0) return null;

        return (
          <View key={category.id} className="mb-10">
            {/* Category Header */}
            <View className="px-6 flex-row items-center justify-between mb-5">
              <View className="flex-row items-center">
                <View
                  className="w-1.5 h-6 rounded-full mr-3"
                  style={{ backgroundColor: category.color }}
                />
                <RNText
                  style={{
                    fontSize: 20,
                    fontFamily: "Outfit_700Bold",
                    color: "#0f172a",
                  }}
                >
                  {category.name}
                </RNText>
              </View>
              {subCats.length > 6 && (
                <View className="flex-row items-center bg-slate-100/50 px-3 py-1 rounded-full border border-slate-100">
                  <RNText
                    style={{
                      fontSize: 11,
                      color: "#64748b",
                      fontFamily: "Outfit_700Bold",
                    }}
                  >
                    SCROLL
                  </RNText>
                  <Ionicons name="chevron-forward" size={14} color="#94a3b8" />
                </View>
              )}
            </View>

            {/* Grid Container (Horizontal Scroll for >6 items) */}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 24,
                // We want 2 rows. Height = (2 * ITEM_SIZE) + spacing
                height: ITEM_SIZE * 2 + GRID_SPACING,
                flexDirection: "column",
                flexWrap: "wrap",
                gap: GRID_SPACING,
              }}
            >
              {subCats.map((sub) => (
                <TouchableOpacity
                  key={sub.id}
                  onPress={() => onPressSubCategory(sub)}
                  activeOpacity={0.7}
                  style={{
                    width: ITEM_SIZE,
                    height: ITEM_SIZE,
                  }}
                  className="bg-white rounded-[28px] items-center justify-center border border-slate-100 shadow-sm"
                >
                  <LinearGradient
                    colors={sub.gradient as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="w-10 h-10 rounded-2xl items-center justify-center mb-1.5 shadow-sm"
                  >
                    <Ionicons name={sub.icon as any} size={20} color="white" />
                  </LinearGradient>
                  <RNText
                    style={{
                      fontSize: 10,
                      fontFamily: "Outfit_700Bold",
                      color: "#334155",
                      textAlign: "center",
                      paddingHorizontal: 6,
                    }}
                    numberOfLines={2}
                  >
                    {sub.name}
                  </RNText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        );
      })}
    </View>
  );
}
