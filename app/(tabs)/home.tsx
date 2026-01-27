import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryFilter } from "../../components/CategoryFilter";
import { ChallengeGrid } from "../../components/ChallengeGrid";
import { CommunityCTA } from "../../components/CommunityCTA";
import { HeroSwiper } from "../../components/HeroSwiper";
import { Text } from "../../components/Text";
import { TopHeader } from "../../components/TopHeader";
import { useThemeColors } from "../../hooks/useTheme";

function AppListItem({
  title,
  icon,
  color,
  description,
  rating = 4.5,
}: {
  title: string;
  icon: any;
  color: string;
  description: string;
  rating?: number;
}) {
  const colors = useThemeColors();
  return (
    <View className="flex-row items-center mb-6">
      <View
        className={`w-16 h-16 rounded-2xl items-center justify-center ${color} shadow-sm`}
      >
        <Ionicons name={icon} size={28} color="white" />
      </View>
      <View className="ml-4 flex-1">
        <Text
          variant="bold"
          className="text-base mb-0.5"
          style={{ color: colors.text }}
        >
          {title}
        </Text>
        <Text
          className="text-xs mb-1"
          numberOfLines={1}
          style={{ color: colors.textSecondary }}
        >
          {description}
        </Text>
        <View className="flex-row items-center">
          <Text
            className="text-xs mr-1"
            style={{ color: colors.textSecondary }}
          >
            {rating}
          </Text>
          <Ionicons name="star" size={12} color="#fbbf24" />
        </View>
      </View>
      <View>
        <View
          className="px-4 py-1.5 border rounded-full"
          style={{ borderColor: colors.borderLight }}
        >
          <Text
            className="font-medium text-xs"
            style={{ color: colors.primary }}
          >
            Get
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <TopHeader />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-4">
          <HeroSwiper />
        </View>

        {/* Recommended Section */}
        <View className="px-6 mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text variant="bold" className="text-xl text-slate-900">
              Recommended for you
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#64748b" />
          </View>

          <AppListItem
            title="Daily Chain Challenge"
            icon="flame"
            color="bg-orange-500"
            description="Solve a quick logic puzzle to warm up your brain."
            rating={4.8}
          />

          <AppListItem
            title="Logic Master"
            icon="game-controller"
            color="bg-indigo-500"
            description="Interactive games designed to boost cognitive speed."
            rating={4.6}
          />

          <AppListItem
            title="Engineer's Toolkit"
            icon="briefcase"
            color="bg-emerald-500"
            description="Apply engineering principles to solve practical problems."
            rating={4.9}
          />

          <AppListItem
            title="Math Whiz"
            icon="calculator"
            color="bg-pink-500"
            description="Sharpen your mental math skills."
            rating={4.7}
          />
        </View>
        {/* Challenge Grid */}
        <View className="mt-12">
          <ChallengeGrid />
        </View>

        {/* Community CTA */}
        <CommunityCTA />
      </ScrollView>
    </SafeAreaView>
  );
}
