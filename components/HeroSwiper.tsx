import { Image } from "expo-image";
import { ScrollView, View } from "react-native";
import { Text } from "./Text";

const HERO_ITEMS = [
  {
    id: 1,
    title: "Logic Puzzle Daily",
    subtitle: "Boost your brain power",
    color: "bg-blue-600",
    image:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Engineering Master",
    subtitle: "Solve complex problems",
    color: "bg-emerald-600",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a782?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Creative Coding",
    subtitle: "Learn to code interactively",
    color: "bg-purple-600",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800",
  },
];

export function HeroSwiper() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
      snapToInterval={320} // 300 (width) + 20 (margin)
      decelerationRate="fast"
    >
      {HERO_ITEMS.map((item) => (
        <View
          key={item.id}
          className={`w-[300px] h-48 rounded-2xl mr-5 overflow-hidden shadow-sm relative ${item.color}`}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              opacity: 0.5,
            }}
            contentFit="cover"
            transition={300}
          />
          <View className="flex-1 justify-end p-5 bg-black/20">
            <Text variant="bold" className="text-white text-2xl mb-1 shadow-md">
              {item.title}
            </Text>
            <Text className="text-slate-100 text-sm font-medium shadow-sm">
              {item.subtitle}
            </Text>
            <View className="mt-3 flex-row">
              <View className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-md">
                <Text className="text-white text-xs font-bold">
                  Start challenge
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
