import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../components/Text";
import { useAppSelector } from "../../hooks/useRedux";

function ProgressCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}) {
  return (
    <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
      <View
        className={`w-12 h-12 rounded-2xl ${color} items-center justify-center mb-3`}
      >
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <Text variant="bold" className="text-2xl text-slate-900 mb-1">
        {value}
      </Text>
      <Text className="text-slate-500 text-sm">{label}</Text>
    </View>
  );
}

function SkillBar({
  skill,
  percentage,
  color,
}: {
  skill: string;
  percentage: number;
  color: string;
}) {
  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-slate-700 font-medium text-sm">{skill}</Text>
        <Text className="text-slate-500 text-sm font-bold">{percentage}%</Text>
      </View>
      <View className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <View
          className={`h-full ${color} rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  );
}

export default function Profile() {
  const router = useRouter();
  const { profile, progress, recentActivity } = useAppSelector(
    (state) => state.user,
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#334155" />
        </TouchableOpacity>
        <Text variant="bold" className="text-lg text-slate-900">
          Profile
        </Text>
        <TouchableOpacity onPress={() => router.push("/settings" as any)}>
          <Ionicons name="settings-outline" size={24} color="#334155" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Profile Header */}
        <View className="bg-white px-6 py-8 border-b border-slate-100">
          <View className="items-center">
            <View className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center border-4 border-white shadow-lg mb-4">
              <Text className="text-white font-bold text-4xl">TM</Text>
            </View>
            <Text variant="bold" className="text-2xl text-slate-900">
              {profile.name}
            </Text>
            <Text className="text-slate-500 mt-1 text-sm">
              {profile.username}
            </Text>
            <View className="mt-4 px-5 py-2.5 bg-indigo-50 rounded-full border border-indigo-100">
              <Text className="text-indigo-600 font-bold text-sm">
                🎯 Tech Path: {profile.techPath}
              </Text>
            </View>
          </View>
        </View>

        {/* Progress Overview */}
        <View className="px-6 py-6">
          <Text variant="bold" className="text-xl text-slate-900 mb-4">
            Progress Overview
          </Text>
          <View className="flex-row gap-3">
            <ProgressCard
              label="Level"
              value={progress.level}
              icon="trophy"
              color="bg-amber-500"
            />
            <ProgressCard
              label="Total XP"
              value={progress.xp}
              icon="flash"
              color="bg-indigo-500"
            />
            <ProgressCard
              label="Day Streak"
              value={`${progress.streak} 🔥`}
              icon="flame"
              color="bg-orange-500"
            />
          </View>
        </View>

        {/* Skill Breakdown */}
        <View className="px-6 py-6 bg-white mx-6 rounded-2xl border border-slate-100 shadow-sm">
          <Text variant="bold" className="text-xl text-slate-900 mb-4">
            Skill Breakdown
          </Text>
          <SkillBar
            skill="Coding & Programming"
            percentage={progress.skillBreakdown.coding}
            color="bg-blue-600"
          />
          <SkillBar
            skill="System Design"
            percentage={progress.skillBreakdown["system-design"]}
            color="bg-emerald-600"
          />
          <SkillBar
            skill="Logic & Problem Solving"
            percentage={progress.skillBreakdown.logic}
            color="bg-amber-600"
          />
          <SkillBar
            skill="Algorithms"
            percentage={progress.skillBreakdown.algorithms}
            color="bg-orange-600"
          />
          <SkillBar
            skill="Real-World Scenarios"
            percentage={progress.skillBreakdown["real-world"]}
            color="bg-red-600"
          />
        </View>

        {/* Recent Activity */}
        <View className="px-6 py-6">
          <Text variant="bold" className="text-xl text-slate-900 mb-4">
            Recent Activity
          </Text>
          <View className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            {recentActivity.map((activity, index) => (
              <View
                key={activity.id}
                className={`px-5 py-4 flex-row items-center ${
                  index !== recentActivity.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <View className="w-11 h-11 rounded-full bg-green-100 items-center justify-center mr-4">
                  <Ionicons name="checkmark-circle" size={24} color="#059669" />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-900 font-medium text-sm">
                    {activity.title}
                  </Text>
                  <Text className="text-slate-500 text-xs mt-1">
                    {new Date(activity.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action Items */}
        <View className="px-6 pb-6">
          <View className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <TouchableOpacity
              className="px-5 py-4 flex-row items-center justify-between border-b border-slate-100"
              onPress={() => router.push("/settings" as any)}
            >
              <View className="flex-row items-center">
                <Ionicons name="settings-outline" size={22} color="#64748b" />
                <Text className="ml-3 text-slate-900 font-medium">
                  Settings
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
            </TouchableOpacity>

            <TouchableOpacity className="px-5 py-4 flex-row items-center justify-between border-b border-slate-100">
              <View className="flex-row items-center">
                <Ionicons
                  name="help-circle-outline"
                  size={22}
                  color="#64748b"
                />
                <Text className="ml-3 text-slate-900 font-medium">
                  Help & Support
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
            </TouchableOpacity>

            <TouchableOpacity className="px-5 py-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color="#64748b"
                />
                <Text className="ml-3 text-slate-900 font-medium">
                  About TechMind
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
