import { Stack, useRouter } from "expo-router";
import { TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "../../components/Logo";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Text } from "../../components/Text";

export default function Login() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-6 justify-center">
      <Stack.Screen options={{ headerShown: false }} />

      <View className="items-center mb-10">
        <Logo size={80} />
        <Text variant="bold" className="text-3xl text-slate-900 mt-6">
          Welcome Back
        </Text>
        <Text className="text-slate-500 mt-2">
          Sign in to continue your progress
        </Text>
      </View>

      <View className="space-y-4 w-full mb-8">
        <View>
          <Text className="mb-2 text-slate-700 font-medium">Email</Text>
          <TextInput
            placeholder="hello@techmind.app"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 font-outfit"
            placeholderTextColor="#94a3b8"
          />
        </View>
        <View>
          <Text className="mb-2 text-slate-700 font-medium">Password</Text>
          <TextInput
            placeholder="••••••••"
            secureTextEntry
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 font-outfit"
            placeholderTextColor="#94a3b8"
          />
        </View>
      </View>

      <PrimaryButton
        title="Login"
        onPress={() => router.replace("/(tabs)/home")}
      />

      <Text className="text-center mt-6 text-slate-500">
        Don't have an account?{" "}
        <Text variant="bold" className="text-primary">
          Sign up
        </Text>
      </Text>
    </SafeAreaView>
  );
}
