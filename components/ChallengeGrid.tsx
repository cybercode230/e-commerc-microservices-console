import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text as RNText, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "../hooks/useRedux";
import type { Challenge } from "../types/challenge";

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const categoryColor =
    {
      coding: "bg-blue-100 border-blue-200",
      cyber: "bg-indigo-100 border-indigo-200",
      math: "bg-emerald-100 border-emerald-200",
      "system-design": "bg-emerald-100 border-emerald-200",
      logic: "bg-amber-100 border-amber-200",
      algorithms: "bg-orange-100 border-orange-200",
      "real-world": "bg-red-100 border-red-200",
    }[challenge.category as string] || "bg-slate-100 border-slate-200";

  const iconColor =
    {
      coding: "#2563eb",
      cyber: "#4f46e5",
      math: "#059669",
      "system-design": "#059669",
      logic: "#d97706",
      algorithms: "#ea580c",
      "real-world": "#dc2626",
    }[challenge.category as string] || "#64748b";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-white rounded-[24px] p-5 mb-1 border border-slate-100 shadow-sm"
    >
      <View
        className={`w-12 h-12 rounded-2xl ${categoryColor} items-center justify-center mb-4`}
      >
        <Ionicons name="code-slash" size={24} color={iconColor} />
      </View>

      <RNText
        style={{
          fontFamily: "Outfit_700Bold",
          fontSize: 16,
          color: "#0f172a",
          marginBottom: 4,
        }}
        numberOfLines={2}
      >
        {challenge.title}
      </RNText>

      <RNText
        style={{
          fontFamily: "Outfit_400Regular",
          fontSize: 12,
          color: "#64748b",
          marginBottom: 16,
        }}
        numberOfLines={2}
      >
        {challenge.description}
      </RNText>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="time-outline" size={14} color="#94a3b8" />
          <RNText
            style={{
              fontFamily: "Outfit_500Medium",
              fontSize: 12,
              color: "#64748b",
            }}
          >
            {challenge.estimatedTime}m
          </RNText>
        </View>

        <View className="flex-row items-center gap-1.5">
          <Ionicons name="star" size={14} color="#fbbf24" />
          <RNText
            style={{
              fontFamily: "Outfit_700Bold",
              fontSize: 12,
              color: "#64748b",
            }}
          >
            {challenge.rating}
          </RNText>
        </View>
      </View>

      <View className="mt-4 pt-4 border-t border-slate-50 flex-row items-center justify-between">
        <View
          className={`px-3 py-1 rounded-full ${
            challenge.difficulty === "beginner"
              ? "bg-green-100"
              : challenge.difficulty === "intermediate"
                ? "bg-yellow-100"
                : "bg-red-100"
          }`}
        >
          <RNText
            style={{
              fontFamily: "Outfit_700Bold",
              fontSize: 10,
              textTransform: "uppercase",
              color:
                challenge.difficulty === "beginner"
                  ? "#15803d"
                  : challenge.difficulty === "intermediate"
                    ? "#a16207"
                    : "#be123c",
            }}
          >
            {challenge.difficulty}
          </RNText>
        </View>

        <RNText
          style={{
            fontFamily: "Outfit_700Bold",
            fontSize: 12,
            color: "#4f46e5",
          }}
        >
          +{challenge.xpReward} XP
        </RNText>
      </View>
    </TouchableOpacity>
  );
}

export function ChallengeGrid() {
  const [currentPage, setCurrentPage] = useState(0);
  const allChallenges = useAppSelector((state) => state.challenges.challenges);

  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(allChallenges.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const displayedChallenges = allChallenges.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <View className="px-6">
      <View className="flex-row items-center justify-between mb-5">
        <View>
          <RNText
            style={{
              fontFamily: "Outfit_700Bold",
              fontSize: 22,
              color: "#0f172a",
            }}
          >
            Global Challenges
          </RNText>
          <RNText
            style={{
              fontFamily: "Outfit_400Regular",
              fontSize: 14,
              color: "#64748b",
              marginTop: 2,
            }}
          >
            {allChallenges.length} tracks available
          </RNText>
        </View>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentPage === 0}
            className={`w-10 h-10 rounded-full items-center justify-center border ${
              currentPage === 0
                ? "bg-slate-50 border-slate-100"
                : "bg-white border-indigo-100"
            }`}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={currentPage === 0 ? "#cbd5e1" : "#4f46e5"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            disabled={currentPage >= totalPages - 1}
            className={`w-10 h-10 rounded-full items-center justify-center border ${
              currentPage >= totalPages - 1
                ? "bg-slate-50 border-slate-100"
                : "bg-white border-indigo-100"
            }`}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={currentPage >= totalPages - 1 ? "#cbd5e1" : "#4f46e5"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2 Column Grid */}
      <View className="gap-4">
        {[0, 1, 2].map((rowIndex) => (
          <View key={rowIndex} className="flex-row gap-4">
            {[0, 1].map((colIndex) => {
              const index = rowIndex * 2 + colIndex;
              const challenge = displayedChallenges[index];

              if (!challenge) {
                return <View key={colIndex} className="flex-1" />;
              }

              return (
                <View key={colIndex} className="flex-1">
                  <ChallengeCard challenge={challenge} />
                </View>
              );
            })}
          </View>
        ))}
      </View>

      {/* Page Indicator */}
      {totalPages > 1 && (
        <View className="flex-row items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <View
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? "w-8 bg-indigo-600"
                  : "w-1.5 bg-slate-200"
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
}
