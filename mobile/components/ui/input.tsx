import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "../../context/theme";
import { Icon } from "./icon";
import { THEME } from "@/lib/theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  const { colors, isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="gap-1.5">
      {label && (
        <Text className="text-foreground text-sm font-medium">{label}</Text>
      )}
      <View className="relative">
        <TextInput
          className={[
            "bg-card border rounded-xl px-4 py-3 text-foreground text-base",
            error ? "border-red-500" : "border-muted",
          ].join(" ")}
          placeholderTextColor={colors.placeholder}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry && showPassword}
          {...props}
        />
        {props.secureTextEntry && (
          <Icon
            name={showPassword ? "EyeOff" : "Eye"}
            className="absolute top-1/2 -translate-y-1/2 right-2"
            onPress={() => setShowPassword(!showPassword)}
            color={isDark ? THEME.dark.foreground : THEME.light.foreground}
          />
        )}
      </View>

      {error && <Text className="text-red-500 text-xs">{error}</Text>}
    </View>
  );
}
