import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { useTheme } from "../../context/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline";
  loading?: boolean;
  disabled?: boolean;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
}: ButtonProps) {
  const { colors } = useTheme();
  const isPrimary = variant === "primary";
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={[
        "rounded-xl py-4 items-center justify-center",
        isPrimary ? "bg-primary" : "border-2 border-primary bg-transparent",
        isDisabled && "opacity-60",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "#fff" : colors.primary} />
      ) : (
        <Text
          className={[
            "text-base font-semibold",
            isPrimary ? "text-white" : "text-primary",
          ].join(" ")}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
