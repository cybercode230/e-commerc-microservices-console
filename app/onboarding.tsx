import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingSlide } from "../components/OnboardingSlide";
import { PrimaryButton } from "../components/PrimaryButton";
import { Text } from "../components/Text";
import settingData from "../constants/setting_data.json";

const { width } = Dimensions.get("window");

export default function Onboarding() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = settingData.onboarding;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/(auth)/login");
    }
  };

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <OnboardingSlide
              title={item.title}
              subtitle={item.subtitle}
              lottieFile={item.lottieFile}
            />
          )}
        />

        {/* Pagination Dots */}
        <View className="flex-row justify-center space-x-2 mb-8">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full transition-all ${currentIndex === index ? "w-8 bg-primary" : "w-2 bg-slate-200"}`}
            />
          ))}
        </View>

        <View className="px-6 mb-12">
          <PrimaryButton
            title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
            onPress={handleNext}
          />

          {currentIndex < slides.length - 1 && (
            <Text
              onPress={() => router.replace("/(auth)/login")}
              className="text-center text-slate-400 mt-4 py-2"
            >
              Skip
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
