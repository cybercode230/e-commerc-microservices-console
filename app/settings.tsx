import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../components/Text";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useThemeColors } from "../hooks/useTheme";
import type { ThemeMode } from "../store/slices/themeSlice";
import { setThemeMode } from "../store/slices/themeSlice";

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const colors = useThemeColors();
  return (
    <View className="mb-6">
      <Text
        className="text-xs font-bold px-6 mb-3 uppercase tracking-wider"
        style={{ color: colors.textSecondary }}
      >
        {title}
      </Text>
      <View
        className="mx-6 rounded-2xl border overflow-hidden shadow-sm"
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
      >
        {children}
      </View>
    </View>
  );
}

function SettingsItem({
  icon,
  label,
  value,
  onPress,
  showChevron = true,
}: {
  icon: any;
  label: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
}) {
  const colors = useThemeColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center px-5 py-4 border-b last:border-b-0"
      style={{ borderColor: colors.borderLight }}
      disabled={!onPress}
    >
      <View
        className="w-9 h-9 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: colors.borderLight }}
      >
        <Ionicons name={icon} size={20} color={colors.textSecondary} />
      </View>
      <Text className="flex-1 font-medium" style={{ color: colors.text }}>
        {label}
      </Text>
      {value && (
        <Text className="text-sm mr-2" style={{ color: colors.textSecondary }}>
          {value}
        </Text>
      )}
      {showChevron && onPress && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.textTertiary}
        />
      )}
    </TouchableOpacity>
  );
}

function SettingsToggle({
  icon,
  label,
  value,
  onValueChange,
}: {
  icon: any;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  const colors = useThemeColors();
  return (
    <View
      className="flex-row items-center px-5 py-4 border-b last:border-b-0"
      style={{ borderColor: colors.borderLight }}
    >
      <View
        className="w-9 h-9 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: colors.borderLight }}
      >
        <Ionicons name={icon} size={20} color={colors.textSecondary} />
      </View>
      <Text className="flex-1 font-medium" style={{ color: colors.text }}>
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primaryLight }}
        thumbColor={value ? colors.primary : colors.surface}
      />
    </View>
  );
}

export default function Settings() {
  const router = useRouter();
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const currentThemeMode = useAppSelector((state) => state.theme.mode);

  // State management for toggles
  const [dailyReminder, setDailyReminder] = useState(true);
  const [streakAlerts, setStreakAlerts] = useState(true);
  const [newChallenges, setNewChallenges] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  const themeOptions: { label: string; value: ThemeMode; icon: any }[] = [
    { label: "Light", value: "light", icon: "sunny-outline" },
    { label: "Dark", value: "dark", icon: "moon-outline" },
    {
      label: "System Default",
      value: "device",
      icon: "phone-portrait-outline",
    },
  ];

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      edges={["top"]}
    >
      {/* Header */}
      <View
        className="flex-row items-center px-6 py-4 border-b mb-6"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={28}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
        <Text
          variant="bold"
          className="text-lg ml-4"
          style={{ color: colors.text }}
        >
          Settings
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingVertical: 0, paddingBottom: 24 }}
      >
        {/* Appearance Section - Moved to top for visibility */}
        <SettingsSection title="Appearance">
          <SettingsItem
            icon="color-palette-outline"
            label="Theme"
            value={
              currentThemeMode === "device"
                ? "System Default"
                : currentThemeMode === "light"
                  ? "Light"
                  : "Dark"
            }
            onPress={() => setShowThemeModal(true)}
          />
          <SettingsItem
            icon="text-outline"
            label="Font Size"
            value="Medium"
            onPress={() => {}}
          />
          <SettingsToggle
            icon="eye-off-outline"
            label="Reduce Motion"
            value={reduceMotion}
            onValueChange={setReduceMotion}
          />
        </SettingsSection>

        {/* Account */}
        <SettingsSection title="Account">
          <SettingsItem
            icon="person-outline"
            label="Edit Profile"
            onPress={() => {}}
          />
          <SettingsItem
            icon="mail-outline"
            label="Change Email"
            onPress={() => {}}
          />
          <SettingsItem
            icon="lock-closed-outline"
            label="Change Password"
            onPress={() => {}}
          />
        </SettingsSection>

        {/* Learning Preferences */}
        <SettingsSection title="Learning Preferences">
          <SettingsItem
            icon="code-slash"
            label="Preferred Challenge Types"
            value="Coding, Logic"
            onPress={() => {}}
          />
          <SettingsItem
            icon="trending-up"
            label="Difficulty Level"
            value="Intermediate"
            onPress={() => {}}
          />
          <SettingsItem
            icon="time-outline"
            label="Daily Goal"
            value="20 min/day"
            onPress={() => {}}
          />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notifications">
          <SettingsToggle
            icon="notifications-outline"
            label="Daily Challenge Reminder"
            value={dailyReminder}
            onValueChange={setDailyReminder}
          />
          <SettingsToggle
            icon="flame-outline"
            label="Streak Alerts"
            value={streakAlerts}
            onValueChange={setStreakAlerts}
          />
          <SettingsToggle
            icon="sparkles-outline"
            label="New Challenges"
            value={newChallenges}
            onValueChange={setNewChallenges}
          />
        </SettingsSection>

        {/* Privacy & Data */}
        <SettingsSection title="Privacy & Data">
          <SettingsItem
            icon="shield-outline"
            label="Privacy Policy"
            onPress={() => {}}
          />
          <SettingsItem
            icon="document-text-outline"
            label="Terms of Service"
            onPress={() => {}}
          />
          <SettingsItem
            icon="download-outline"
            label="Download My Data"
            onPress={() => {}}
          />
          <SettingsItem
            icon="refresh-outline"
            label="Reset Progress"
            onPress={() => {}}
          />
        </SettingsSection>

        {/* Support */}
        <SettingsSection title="Support">
          <SettingsItem
            icon="help-circle-outline"
            label="Help Center"
            onPress={() => {}}
          />
          <SettingsItem
            icon="chatbubble-outline"
            label="Send Feedback"
            onPress={() => {}}
          />
          <SettingsItem
            icon="information-circle-outline"
            label="About TechMind"
            onPress={() => {}}
          />
          <SettingsItem
            icon="code-outline"
            label="Version"
            value="1.0.0"
            showChevron={false}
          />
        </SettingsSection>

        {/* Logout */}
        <View className="px-6 mt-4">
          <TouchableOpacity
            className="border-2 rounded-2xl py-4 items-center shadow-sm"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.error + "40", // transparent error color
            }}
            onPress={() => {
              // In a real app, you would also clear the auth token here
              // Navigate back to the auth group which contains login/signup
              // Using router.replace prevents going back to settings
              router.dismissAll();
              router.replace("/login");
            }}
          >
            <Text
              className="font-bold text-base"
              style={{ color: colors.error }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Theme Selection Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showThemeModal}
        onRequestClose={() => setShowThemeModal(false)}
      >
        <TouchableOpacity
          className="flex-1 justify-center items-center bg-black/50"
          activeOpacity={1}
          onPress={() => setShowThemeModal(false)}
        >
          <View
            className="w-4/5 rounded-3xl p-6 shadow-xl"
            style={{ backgroundColor: colors.surface }}
          >
            <Text
              variant="bold"
              className="text-xl mb-4"
              style={{ color: colors.text }}
            >
              Choose Theme
            </Text>

            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                className="flex-row items-center py-4 border-b last:border-b-0"
                style={{ borderColor: colors.borderLight }}
                onPress={() => {
                  dispatch(setThemeMode(option.value));
                  setShowThemeModal(false);
                }}
              >
                <View className="flex-row items-center flex-1">
                  <Ionicons
                    name={option.icon}
                    size={24}
                    color={
                      currentThemeMode === option.value
                        ? colors.primary
                        : colors.textSecondary
                    }
                  />
                  <Text
                    className="ml-3 font-medium text-base"
                    style={{
                      color:
                        currentThemeMode === option.value
                          ? colors.primary
                          : colors.text,
                    }}
                  >
                    {option.label}
                  </Text>
                </View>
                {currentThemeMode === option.value && (
                  <Ionicons name="checkmark" size={24} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              className="mt-6 self-end"
              onPress={() => setShowThemeModal(false)}
            >
              <Text className="font-bold" style={{ color: colors.primary }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
