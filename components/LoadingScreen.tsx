import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import settingData from "../constants/setting_data.json";
import { Logo } from "./Logo";
import { Text } from "./Text";

export function LoadingScreen() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.3 + progress.value * 0.7,
    transform: [{ scale: 0.95 + progress.value * 0.05 }],
  }));

  return (
    <View className="flex-1 bg-white items-center justify-center">
      {/* Wrapper to handle entering animation separate from the continuous style animation */}
      <Animated.View entering={FadeIn.duration(800)} className="items-center">
        <Animated.View style={animatedStyle} className="items-center">
          <Logo size={120} />
          <Text variant="bold" className="text-xl mt-8 text-slate-800">
            {settingData.splash.loadingText}
          </Text>

          {/* Separate progress indicator */}
          <Animated.View style={{ opacity: progress }}>
            <Text className="text-primary text-4xl mt-2">• • •</Text>
          </Animated.View>
        </Animated.View>
      </Animated.View>

      <View className="absolute bottom-10">
        <Text className="text-slate-400 text-sm font-medium tracking-widest uppercase">
          {settingData.splash.tagline}
        </Text>
      </View>
    </View>
  );
}
