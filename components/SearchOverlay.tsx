import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useThemeColors } from "../hooks/useTheme";
import {
  addSearchTerm,
  clearHistory,
  removeSearchTerm,
} from "../store/slices/searchSlice";
import { Text } from "./Text";

interface SearchOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { id: "1", title: "React Native", color: "bg-indigo-500" },
  { id: "2", title: "TypeScript", color: "bg-blue-500" },
  { id: "3", title: "UI Design", color: "bg-pink-500" },
  { id: "4", title: "Backend", color: "bg-emerald-500" },
  { id: "5", title: "Testing", color: "bg-orange-500" },
];

const DEFAULT_SEARCH_IMAGE =
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=100&h=100&fit=crop";

export function SearchOverlay({ isVisible, onClose }: SearchOverlayProps) {
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const recentSearches = useAppSelector((state) => state.search.recentSearches);
  const [query, setQuery] = useState("");

  if (!isVisible) return null;

  const handleSearchSubmit = () => {
    if (query.trim()) {
      dispatch(addSearchTerm(query.trim()));
      // You could also navigate to a search results page here if needed
    }
  };

  return (
    <Animated.View
      entering={FadeInUp.duration(300).springify().damping(15)}
      exiting={FadeOutUp.duration(200)}
      className="absolute top-0 left-0 right-0 bottom-0 z-[200]"
      style={{ backgroundColor: "#ffffff" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header Search Input */}
        <View
          className="flex-row items-center px-6 pt-12 pb-4 border-b"
          style={{ borderColor: colors.borderLight }}
        >
          <View
            className="flex-row items-center flex-1 h-12 rounded-xl px-4 mr-3"
            style={{ backgroundColor: colors.borderLight }}
          >
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              autoFocus
              placeholder="Search challenges..."
              value={query}
              onChangeText={setQuery}
              className="flex-1 ml-3 text-base font-medium"
              placeholderTextColor={colors.textTertiary}
              style={{ color: colors.text }}
              returnKeyType="search"
              onSubmitEditing={handleSearchSubmit}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={colors.textTertiary}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={onClose}>
            <Text
              className="font-bold text-base"
              style={{ color: colors.primary }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 px-6 pt-6"
          showsVerticalScrollIndicator={false}
        >
          {/* Recent Searches */}
          <View className="flex-row items-center justify-between mb-6">
            <Text
              variant="bold"
              className="text-xl"
              style={{ color: colors.text }}
            >
              {query.length > 0 ? "Related Searches" : "Recent Searches"}
            </Text>
            {recentSearches.length > 0 && query.length === 0 && (
              <TouchableOpacity onPress={() => dispatch(clearHistory())}>
                <Text
                  className="text-sm font-medium"
                  style={{ color: colors.primary }}
                >
                  Clear All
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {recentSearches
            .filter(
              (term) =>
                query.length === 0 ||
                term.toLowerCase().includes(query.toLowerCase()),
            )
            .map((term, index) => (
              <TouchableOpacity
                key={`${term}-${index}`}
                className="flex-row items-center mb-5"
                onPress={() => setQuery(term)}
              >
                <View
                  className="w-14 h-14 rounded-xl items-center justify-center"
                  style={{ backgroundColor: colors.borderLight }}
                >
                  <Ionicons
                    name="time-outline"
                    size={24}
                    color={colors.textTertiary}
                  />
                </View>
                <View className="flex-1 ml-4">
                  <Text
                    variant="bold"
                    className="text-base"
                    style={{ color: colors.text }}
                  >
                    {term}
                  </Text>
                  <Text
                    className="text-sm mt-0.5"
                    style={{ color: colors.textTertiary }}
                  >
                    Recent search
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => dispatch(removeSearchTerm(term))}
                >
                  <Ionicons
                    name="close"
                    size={20}
                    color={colors.textTertiary}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

          {recentSearches.length === 0 && query.length === 0 && (
            <View className="py-10 items-center justify-center opacity-40">
              <Ionicons name="search" size={48} color={colors.textTertiary} />
              <Text
                className="mt-2 text-center"
                style={{ color: colors.textTertiary }}
              >
                Your recent searches will appear here
              </Text>
            </View>
          )}

          {/* Categories / Recommended */}
          <View className="mt-8 mb-5">
            <Text
              variant="bold"
              className="text-xl"
              style={{ color: colors.text }}
            >
              {query.length > 0 ? "Suggested Categories" : "Explore Categories"}
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-3 pb-20">
            {CATEGORIES.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="px-5 py-3 rounded-2xl border shadow-sm"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
                onPress={() => setQuery(item.title)}
              >
                <View className={`w-2 h-2 rounded-full mb-1 ${item.color}`} />
                <Text
                  className="text-sm font-bold"
                  style={{ color: colors.text }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {query.length > 0 &&
            recentSearches.filter((term) =>
              term.toLowerCase().includes(query.toLowerCase()),
            ).length === 0 && (
              <View className="items-center justify-center mt-10 opacity-50">
                <Ionicons
                  name="search-outline"
                  size={64}
                  color={colors.textTertiary}
                />
                <Text
                  className="mt-4 text-center text-lg"
                  style={{ color: colors.textTertiary }}
                >
                  Keep searching for "{query}"...
                </Text>
              </View>
            )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}
