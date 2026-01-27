import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Text as RNText,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { CATEGORIES } from "../constants/categories";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setCategory } from "../store/slices/challengeSlice";
import type { CategoryType } from "../types/challenge";

export function CategoryFilter() {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.challenges.selectedCategory,
  );

  const handleCategoryPress = (categoryId: CategoryType | "all") => {
    dispatch(setCategory(categoryId));
  };

  return (
    <View className="py-2 bg-white">
      <View className="px-6 mb-4">
        <RNText
          style={{
            fontFamily: "Outfit_700Bold",
            fontSize: 20,
            color: "#0f172a",
          }}
        >
          Browse by Category
        </RNText>
        <RNText
          style={{
            fontFamily: "Outfit_400Regular",
            fontSize: 14,
            color: "#64748b",
            marginTop: 2,
          }}
        >
          Explore different tech domains
        </RNText>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          gap: 12,
          paddingBottom: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => handleCategoryPress("all")}
          activeOpacity={0.7}
          className={`px-6 py-3 rounded-[20px] border-2 shadow-sm ${
            selectedCategory === "all"
              ? "bg-indigo-600 border-indigo-600 shadow-indigo-200"
              : "bg-white border-slate-100"
          }`}
        >
          <RNText
            style={{
              fontFamily: "Outfit_700Bold",
              fontSize: 14,
              color: selectedCategory === "all" ? "white" : "#475569",
            }}
          >
            All
          </RNText>
        </TouchableOpacity>

        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategoryPress(category.id)}
            activeOpacity={0.7}
            className={`px-5 py-3 rounded-[20px] border-2 flex-row items-center gap-2 shadow-sm ${
              selectedCategory === category.id
                ? "bg-indigo-600 border-indigo-600 shadow-indigo-200"
                : "bg-white border-slate-100"
            }`}
          >
            <Ionicons
              name={category.icon as any}
              size={18}
              color={selectedCategory === category.id ? "#ffffff" : "#64748b"}
            />
            <RNText
              style={{
                fontFamily: "Outfit_700Bold",
                fontSize: 14,
                color: selectedCategory === category.id ? "white" : "#475569",
              }}
            >
              {category.name}
            </RNText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
