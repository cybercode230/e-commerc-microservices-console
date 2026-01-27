import { Stack, useRouter } from "expo-router";
import { TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Text } from "../../components/Text";

export default function Register() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-6 justify-center">
      <Stack.Screen options={{ headerShown: false }} />

      <View className="items-center mb-10">
        <Text variant="bold" className="text-3xl text-slate-900 mt-6">
          Create Account
        </Text>
        <Text className="text-slate-500 mt-2">
          Start your journey with TechMind
        </Text>
      </View>

      <View className="space-y-4 w-full mb-8">
        <TextInput
          placeholder="Full Name"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 font-outfit"
        />
        <TextInput
          placeholder="Email"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 font-outfit"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 font-outfit"
        />
      </View>

      <PrimaryButton
        title="Create Account"
        onPress={() => router.replace("/(tabs)/home")}
      />
    </SafeAreaView>
  );
}
