import LottieView from "lottie-react-native";
import { Dimensions, View } from "react-native";
import { Text } from "./Text";

const { width } = Dimensions.get("window");

// Map filenames to actual require statements since dynamic require is not supported in Expo/Metro
const LOTTIE_MAP: Record<string, any> = {
  "Young programmers working with computer.json": require("../assets/images/Young programmers working with computer.json"),
  "A hacker breaks into a program.json": require("../assets/images/A hacker breaks into a program.json"),
  "Ai-powered marketing tools abstract.json": require("../assets/images/Ai-powered marketing tools abstract.json"),
};

interface Props {
  title: string;
  subtitle: string;
  lottieFile?: string;
}

export function OnboardingSlide({ title, subtitle, lottieFile }: Props) {
  const animationSource = lottieFile ? LOTTIE_MAP[lottieFile] : null;

  return (
    <View style={{ width }} className="flex-1 items-center justify-center px-6">
      <View className="flex-1 justify-center items-center w-full">
        <View className="w-full aspect-square mb-10 items-center justify-center overflow-hidden">
          {animationSource ? (
            <LottieView
              source={animationSource}
              autoPlay
              loop
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <View className="w-full h-full bg-slate-100 rounded-3xl items-center justify-center">
              <Text className="text-slate-400">Animation Missing</Text>
            </View>
          )}
        </View>

        <Text
          variant="bold"
          className="text-3xl text-center mb-4 text-slate-900"
        >
          {title}
        </Text>
        <Text className="text-lg text-center text-slate-500 leading-relaxed px-4">
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
