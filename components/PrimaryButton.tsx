import { ActivityIndicator, TouchableOpacity } from "react-native";
import { cn } from "../utils/cn";
import { Text } from "./Text";

interface Props {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export function PrimaryButton({
  onPress,
  title,
  isLoading,
  className,
  variant = "primary",
}: Props) {
  const baseStyles =
    "w-full py-4 rounded-2xl items-center justify-center flex-row shadow-sm active:scale-95 transform transition-all";

  const variants = {
    primary: "bg-primary",
    secondary: "bg-accent",
    outline: "bg-transparent border-2 border-primary",
  };

  const textVariants = {
    primary: "text-white",
    secondary: "text-white",
    outline: "text-primary",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      className={cn(baseStyles, variants[variant], className)}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text variant="bold" className={cn("text-lg", textVariants[variant])}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
