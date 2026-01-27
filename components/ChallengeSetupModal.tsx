import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Text as RNText,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    FadeIn,
    FadeOut,
    SlideInDown,
    SlideInRight,
    SlideOutDown,
    SlideOutLeft,
} from "react-native-reanimated";
import { ONBOARDING_CONFIG } from "../constants/challenge_data";
import { useAppDispatch } from "../hooks/useRedux";
import { useThemeColors } from "../hooks/useTheme";
import { setSubCategoryConfig } from "../store/slices/preferencesSlice";
import { SubCategory } from "../types/challenge";
import { Storage } from "../utils/storage";
import { ChallengeOption } from "./ChallengeOption";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ChallengeSetupModalProps {
  isVisible: boolean;
  onClose: () => void;
  subCategory: SubCategory | null;
  onComplete: () => void;
}

export function ChallengeSetupModal({
  isVisible,
  onClose,
  subCategory,
  onComplete,
}: ChallengeSetupModalProps) {
  const colors = useThemeColors();
  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalSteps = ONBOARDING_CONFIG.length;
  const currentQuestion = ONBOARDING_CONFIG[currentStep];

  useEffect(() => {
    if (isVisible) {
      setCurrentStep(0);
      setAnswers({});
    }
  }, [isVisible]);

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = async () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      if (subCategory) {
        const config = {
          difficulty: 2,
          timePerChallenge: 15,
          thinkingStyle: answers["thinking_style"] || "visual",
          intensity: 2,
          isConfigured: true,
        };
        dispatch(setSubCategoryConfig({ id: subCategory.id, config }));
        await Storage.save(`challenge_prefs:${subCategory.id}`, config);
        onComplete();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      onClose();
    }
  };

  if (!isVisible || !subCategory) return null;

  const canContinue = !!answers[currentQuestion.id];

  return (
    <View style={StyleSheet.absoluteFill} className="z-[1000]">
      {/* Backdrop */}
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        className="flex-1 bg-black/60"
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          className="flex-1"
        />
      </Animated.View>

      {/* Sheet Content */}
      <Animated.View
        entering={SlideInDown.springify().damping(20)}
        exiting={SlideOutDown}
        className="absolute bottom-0 left-0 right-0 rounded-t-[44px] overflow-hidden"
        style={{
          height: SCREEN_HEIGHT * 0.88,
          backgroundColor: colors.background,
        }}
      >
        {/* Dynamic Gradient Header */}
        <LinearGradient
          colors={subCategory.gradient as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
          className="px-8 pt-10 pb-12"
        >
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity
              onPress={handleBack}
              className="p-2.5 bg-white/20 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <View className="flex-1 items-center px-4">
              <View className="flex-row items-center mb-1">
                <RNText
                  style={{
                    fontSize: 18,
                    color: "white",
                    fontFamily: "Outfit_700Bold",
                  }}
                >
                  {subCategory.name}
                </RNText>
                <View className="bg-white/25 px-2 py-0.5 rounded-full ml-2 border border-white/20">
                  <RNText
                    style={{
                      fontSize: 9,
                      color: "white",
                      fontFamily: "Outfit_700Bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {subCategory.type}
                  </RNText>
                </View>
              </View>
              <RNText
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "Outfit_500Medium",
                }}
              >
                Step {currentStep + 1} of {totalSteps}
              </RNText>
            </View>

            <TouchableOpacity
              onPress={onClose}
              className="p-2.5 bg-white/20 rounded-full"
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* New Sleek Progress Indicator */}
          <View className="flex-row gap-1.5 mt-6">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <View
                key={idx}
                className="h-1.5 flex-1 rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                {idx <= currentStep && (
                  <Animated.View
                    entering={FadeIn.delay(idx * 50)}
                    className="h-full bg-white rounded-full"
                    style={{ width: idx < currentStep ? "100%" : "100%" }} // Simple logic for now
                  />
                )}
              </View>
            ))}
          </View>
        </LinearGradient>

        <View className="flex-1 px-8 pt-10 pb-14">
          {/* Content */}
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <Animated.View
              key={currentStep}
              entering={SlideInRight.duration(400)}
              exiting={SlideOutLeft.duration(400)}
            >
              <RNText
                style={{
                  fontFamily: "Outfit_700Bold",
                  fontSize: 28,
                  color: colors.text,
                  marginBottom: 8,
                }}
              >
                {currentQuestion.title}
              </RNText>
              {currentQuestion.description && (
                <RNText
                  style={{
                    fontFamily: "Outfit_400Regular",
                    fontSize: 16,
                    color: colors.textSecondary,
                    marginBottom: 28,
                    lineHeight: 24,
                  }}
                >
                  {currentQuestion.description}
                </RNText>
              )}

              <View className="mt-2">
                {currentQuestion.options.map((option) => (
                  <ChallengeOption
                    key={option.id}
                    label={option.label}
                    isSelected={answers[currentQuestion.id] === option.id}
                    onSelect={() => handleSelect(option.id)}
                  />
                ))}
              </View>
            </Animated.View>
          </ScrollView>

          {/* Footer Action */}
          <View className="mt-8">
            <TouchableOpacity
              onPress={handleNext}
              disabled={!canContinue}
              activeOpacity={0.8}
              className={`py-5 rounded-[24px] items-center shadow-2xl ${!canContinue ? "opacity-50" : ""}`}
              style={{ backgroundColor: subCategory.color }}
            >
              <RNText
                style={{
                  fontSize: 18,
                  color: "white",
                  fontFamily: "Outfit_700Bold",
                }}
              >
                {currentStep === totalSteps - 1
                  ? "Start Challenge"
                  : "Continue"}
              </RNText>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
