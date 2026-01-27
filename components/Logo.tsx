import { Image } from "expo-image";
import { View } from "react-native";

export function Logo({ size = 100 }: { size?: number }) {
  return (
    <View
      style={{ width: size, height: size }}
      className="shadow-lg rounded-2xl overflow-hidden bg-white"
    >
      <Image
        source={require("../assets/images/techmindLogo.png")}
        style={{ width: "100%", height: "100%" }}
        contentFit="contain"
        transition={300}
      />
    </View>
  );
}
