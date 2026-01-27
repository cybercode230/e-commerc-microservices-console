import { Text as RNText, TextProps } from "react-native";
import { cn } from "../utils/cn";

interface Props extends TextProps {
  className?: string;
  variant?: "regular" | "medium" | "bold";
}

export function Text({
  className,
  variant = "regular",
  style,
  ...props
}: Props) {
  const fontFamily = {
    regular: "Outfit_400Regular",
    medium: "Outfit_500Medium",
    bold: "Outfit_700Bold",
  }[variant];

  return (
    <RNText
      style={[{ fontFamily }, style]}
      className={cn("text-slate-900", className)}
      {...props}
    />
  );
}
