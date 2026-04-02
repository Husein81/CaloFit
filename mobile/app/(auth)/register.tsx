import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Redirect, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { SocialAuthSheet } from "../../components/auth/social-auth-sheet";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../context/auth";
import { useTheme } from "../../context/theme";
import { useRegister } from "../../hooks/auth";

export default function RegisterScreen() {
  const { isAuthenticated } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();
  const registerMutation = useRegister();
  const [sheetOpen, setSheetOpen] = useState(false);

  const form = useForm({
    defaultValues: { name: "", email: "", password: "" },
    onSubmit: async ({ value }) => {
      await registerMutation.mutateAsync(value);
    },
  });

  if (isAuthenticated) return <Redirect href="/(tabs)" />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 px-6 py-4">
        {/* Header */}
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-card mb-8"
        >
          <ArrowLeft size={20} color={colors.foreground} />
        </Pressable>

        {/* Title */}
        <View className="mb-8">
          <Text className="text-foreground text-3xl font-bold mb-1">
            Create account
          </Text>
          <Text className="text-muted-foreground text-base">
            Start your fitness journey today
          </Text>
        </View>

        {/* Form */}
        <View className="gap-4">
          <form.Field
            name="name"
            validators={{
              onChange: z.string().min(2, "Name must be at least 2 characters"),
            }}
          >
            {(field) => (
              <Input
                label="Full Name"
                placeholder="John Doe"
                autoCapitalize="words"
                autoComplete="name"
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
                error={
                  field.state.meta.isTouched
                    ? field.state.meta.errors[0]?.toString()
                    : undefined
                }
              />
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: z.string().email("Please enter a valid email"),
            }}
          >
            {(field) => (
              <Input
                label="Email"
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
                error={
                  field.state.meta.isTouched
                    ? field.state.meta.errors[0]?.toString()
                    : undefined
                }
              />
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onChange: z
                .string()
                .min(8, "Password must be at least 8 characters"),
            }}
          >
            {(field) => (
              <Input
                label="Password"
                placeholder="••••••••"
                secureTextEntry
                autoComplete="new-password"
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
                error={
                  field.state.meta.isTouched
                    ? field.state.meta.errors[0]?.toString()
                    : undefined
                }
              />
            )}
          </form.Field>
        </View>

        {/* API Error */}
        {registerMutation.isError && (
          <Text className="text-red-500 text-sm mt-4 text-center">
            {registerMutation.error.message}
          </Text>
        )}

        {/* Submit */}
        <View className="mt-6">
          <form.Subscribe selector={(s) => s.canSubmit}>
            {(canSubmit) => (
              <Button
                title="Create Account"
                onPress={form.handleSubmit}
                loading={registerMutation.isPending}
                disabled={!canSubmit}
              />
            )}
          </form.Subscribe>
        </View>

        {/* Divider */}
        <View className="flex-row items-center gap-3 mt-6">
          <View className="flex-1 h-px bg-muted" />
          <Text className="text-muted-foreground text-xs">or</Text>
          <View className="flex-1 h-px bg-muted" />
        </View>

        {/* Social auth trigger */}
        <Pressable
          onPress={() => setSheetOpen(true)}
          className="mt-4 py-3.5 rounded-xl border border-muted items-center"
        >
          <Text className="text-foreground text-sm font-medium">
            Continue with Google
          </Text>
        </Pressable>

        {/* Footer */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-muted-foreground text-sm">
            Already have an account?{" "}
          </Text>
          <Pressable onPress={() => router.replace("/(auth)/login")}>
            <Text className="text-primary text-sm font-semibold">Sign In</Text>
          </Pressable>
        </View>
      </View>

      <SocialAuthSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </SafeAreaView>
  );
}
