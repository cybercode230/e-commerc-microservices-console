import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useMemo, useState } from "react";
import {
  Text as RNText,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryFilter } from "../../components/CategoryFilter";
import { ChallengeCategoryCard } from "../../components/ChallengeCategoryCard";
import { ChallengeGridView } from "../../components/ChallengeGridView";
import { ChallengeSetupModal } from "../../components/ChallengeSetupModal";
import { TopHeader } from "../../components/TopHeader";
import { CATEGORIES, SUB_CATEGORIES_DATA } from "../../constants/categories";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useThemeColors } from "../../hooks/useTheme";
import {
  setSubCategoryConfig,
  SubCategoryConfig,
} from "../../store/slices/preferencesSlice";
import { SubCategory } from "../../types/challenge";
import { Storage } from "../../utils/storage";

export default function Challenges() {
  const colors = useThemeColors();
  const dispatch = useAppDispatch();

  // State from Redux
  const selectedCategory = useAppSelector(
    (state) => state.challenges.selectedCategory,
  );
  const configs = useAppSelector(
    (state) => state.preferences.subCategoryConfigs,
  );

  // Derived filtered subcategories
  const filteredSubCategories = useMemo(() => {
    let list = SUB_CATEGORIES_DATA;
    if (selectedCategory !== "all") {
      list = list.filter((sub) => sub.parentCategory === selectedCategory);
    }
    return list;
  }, [selectedCategory]);

  // Sync AsyncStorage to Redux on mount
  useEffect(() => {
    const syncStorage = async () => {
      for (const sub of SUB_CATEGORIES_DATA) {
        if (!configs[sub.id]) {
          const storedConfig = await Storage.get<SubCategoryConfig>(
            `challenge_prefs:${sub.id}`,
          );
          if (storedConfig) {
            dispatch(
              setSubCategoryConfig({ id: sub.id, config: storedConfig }),
            );
          }
        }
      }
    };
    syncStorage();
  }, [dispatch, configs]);

  // UI Local State
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [setupModalVisible, setSetupModalVisible] = useState(false);
  const [practicalModalVisible, setPracticalModalVisible] = useState(false);
  const [isGridView, setIsGridView] = useState(false);

  const handlePressSubCategory = async (sub: SubCategory) => {
    setSelectedSubCategory(sub);
    if (sub.type === "practical") {
      setPracticalModalVisible(true);
      return;
    }

    // Check if configuration exists
    const config =
      configs[sub.id] ||
      (await Storage.get<SubCategoryConfig>(`challenge_prefs:${sub.id}`));

    if (config?.isConfigured) {
      console.log(`Starting challenge for ${sub.name}...`);
    } else {
      setSetupModalVisible(true);
    }
  };

  const handleSetupComplete = () => {
    setSetupModalVisible(false);
    if (selectedSubCategory) {
      console.log(
        `Setup complete for ${selectedSubCategory.name}. Starting challenge...`,
      );
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      edges={["top"]}
    >
      <TopHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Header */}
        <Animated.View
          entering={FadeIn.duration(500)}
          className="px-6 pt-4 mb-4"
        >
          <View>
            <RNText
              style={{
                fontFamily: "Outfit_700Bold",
                fontSize: 36,
                color: colors.text,
              }}
            >
              Challenges
            </RNText>
            <RNText
              style={{
                fontFamily: "Outfit_400Regular",
                fontSize: 16,
                color: colors.textSecondary,
                opacity: 0.6,
                marginTop: 4,
              }}
            >
              Master new skills daily
            </RNText>
          </View>
        </Animated.View>

        {/* Global Category Filter Component */}
        <CategoryFilter />

        <View className="px-6 mt-8">
          <View className="flex-row items-center justify-between mb-8">
            <View className="flex-1 mr-4">
              <RNText
                style={{
                  fontSize: 24,
                  color: colors.text,
                  fontFamily: "Outfit_700Bold",
                }}
              >
                {isGridView
                  ? "Tech Directory"
                  : selectedCategory === "all"
                    ? "Recommended Tracks"
                    : `${CATEGORIES.find((c) => c.id === selectedCategory)?.name} Learning`}
              </RNText>
              <RNText
                style={{
                  fontSize: 13,
                  color: colors.textSecondary,
                  fontFamily: "Outfit_400Regular",
                  marginTop: 2,
                }}
              >
                {isGridView
                  ? "Explore all specialized tracks"
                  : "Personalized engineering paths"}
              </RNText>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              className={`flex-row items-center px-4 py-2.5 rounded-xl border ${isGridView ? "bg-slate-100 border-slate-200" : "bg-indigo-50 border-indigo-100"}`}
              onPress={() => setIsGridView(!isGridView)}
            >
              <RNText
                style={{
                  marginRight: 6,
                  fontFamily: "Outfit_700Bold",
                  color: isGridView ? colors.textSecondary : colors.primary,
                  fontSize: 14,
                }}
              >
                {isGridView ? "List View" : "See All"}
              </RNText>
              <Ionicons
                name={isGridView ? "list" : "grid"}
                size={16}
                color={isGridView ? colors.textSecondary : colors.primary}
              />
            </TouchableOpacity>
          </View>

          {isGridView ? (
            <ChallengeGridView onPressSubCategory={handlePressSubCategory} />
          ) : (
            <View>
              {filteredSubCategories.map((sub, index) => (
                <ChallengeCategoryCard
                  key={sub.id}
                  id={sub.id}
                  index={index}
                  title={sub.name}
                  description={sub.description}
                  icon={sub.icon}
                  color={sub.color}
                  gradient={sub.gradient}
                  type={sub.type}
                  onPress={() => handlePressSubCategory(sub)}
                />
              ))}

              {filteredSubCategories.length === 0 && (
                <View className="items-center justify-center mt-20 opacity-40">
                  <Ionicons
                    name="file-tray-outline"
                    size={64}
                    color={colors.textTertiary}
                  />
                  <RNText
                    style={{
                      marginTop: 16,
                      textAlign: "center",
                      fontSize: 18,
                      color: colors.textTertiary,
                      fontFamily: "Outfit_400Regular",
                    }}
                  >
                    No challenges available for this category yet.
                  </RNText>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Practical Roadmap Overlay */}
      {practicalModalVisible && selectedSubCategory && (
        <View style={StyleSheet.absoluteFill} className="z-[2000]">
          <Animated.View
            entering={FadeIn}
            className="flex-1 bg-black/85 items-center justify-center px-10"
          >
            <TouchableOpacity
              onPress={() => setPracticalModalVisible(false)}
              className="absolute top-16 right-6 p-2 bg-white/20 rounded-full"
            >
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>

            <LinearGradient
              colors={selectedSubCategory.gradient as any}
              className="w-28 h-28 rounded-[32px] items-center justify-center mb-10 shadow-2xl"
            >
              <Ionicons
                name={selectedSubCategory.icon as any}
                size={54}
                color="white"
              />
            </LinearGradient>

            <RNText
              style={{
                fontSize: 32,
                color: "white",
                fontFamily: "Outfit_700Bold",
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              {selectedSubCategory.name} Practical
            </RNText>

            <View className="bg-white/10 p-8 rounded-[40px] border border-white/20 w-full backdrop-blur-xl">
              <RNText
                style={{
                  color: "rgba(255,255,255,0.7)",
                  textAlign: "center",
                  fontSize: 17,
                  marginBottom: 32,
                  lineHeight: 26,
                  fontFamily: "Outfit_400Regular",
                }}
              >
                We are building specialized SDKs for hands-on labs. This feature
                is slated for global rollout soon.
              </RNText>

              <View className="flex-row justify-center gap-6">
                <View className="items-center">
                  <RNText
                    style={{
                      fontSize: 32,
                      color: "white",
                      fontFamily: "Outfit_700Bold",
                    }}
                  >
                    03
                  </RNText>
                  <RNText
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: 2,
                      marginTop: 4,
                      fontFamily: "Outfit_700Bold",
                    }}
                  >
                    Months
                  </RNText>
                </View>
                <View className="items-center">
                  <RNText
                    style={{
                      fontSize: 32,
                      color: "white",
                      fontFamily: "Outfit_700Bold",
                    }}
                  >
                    12
                  </RNText>
                  <RNText
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: 2,
                      marginTop: 4,
                      fontFamily: "Outfit_700Bold",
                    }}
                  >
                    Days
                  </RNText>
                </View>
                <View className="items-center">
                  <RNText
                    style={{
                      fontSize: 32,
                      color: "white",
                      fontFamily: "Outfit_700Bold",
                    }}
                  >
                    45
                  </RNText>
                  <RNText
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: 2,
                      marginTop: 4,
                      fontFamily: "Outfit_700Bold",
                    }}
                  >
                    Mins
                  </RNText>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setPracticalModalVisible(false)}
              activeOpacity={0.8}
              className="mt-12 py-5 px-16 rounded-[24px] bg-white shadow-2xl"
            >
              <RNText
                style={{
                  color: "#0f172a",
                  fontSize: 18,
                  fontFamily: "Outfit_700Bold",
                }}
              >
                Notify Me
              </RNText>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      {/* Theory Personalization Overlay */}
      <ChallengeSetupModal
        isVisible={setupModalVisible}
        subCategory={selectedSubCategory as any}
        onClose={() => setSetupModalVisible(false)}
        onComplete={handleSetupComplete}
      />
    </SafeAreaView>
  );
}
