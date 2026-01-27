import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";
import { Text } from "./Text";

export function CommunityCTA() {
  return (
    <View className="px-6 my-8">
      <View
        className="bg-indigo-600/90 rounded-3xl p-6 overflow-hidden relative shadow-lg"
        style={{ backgroundColor: "rgba(79, 70, 229, 0.95)" }}
      >
        {/* Background Pattern */}
        <View className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <View className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
        <View className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full" />

        <View className="flex-row items-center mb-4">
          <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center mr-4 shadow-lg">
            <Image
              source={require("../assets/images/byteminds-logo-removebg-preview.png")}
              style={{ width: 48, height: 48 }}
              contentFit="contain"
            />
          </View>
          <View className="flex-1">
            <Text variant="bold" className="text-white text-xl mb-1">
              Join ByteMinds
            </Text>
            <Text className="text-indigo-100 text-sm">
              Connect with fellow tech thinkers
            </Text>
          </View>
        </View>

        <Text className="text-white/90 text-sm leading-relaxed mb-6">
          Join our community of developers, engineers, and problem solvers.
          Share your progress, learn together, and grow your skills.
        </Text>

        <TouchableOpacity className="bg-white rounded-full py-3 px-6 self-start shadow-lg">
          <Text className="text-indigo-600 font-bold text-sm">
            Join Community →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
