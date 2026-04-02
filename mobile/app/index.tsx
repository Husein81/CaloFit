import { Redirect, useRouter } from "expo-router";
import { Flame } from "lucide-react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/auth";
import { useTheme } from "../context/theme";

export default function WelcomeScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();

  if (isLoading) return null;
  if (isAuthenticated) return <Redirect href="/(tabs)" />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1 px-6 justify-between py-12">
        {/* Logo & Branding */}
        <View className="flex-1 items-center justify-center gap-6">
          <View className="bg-secondary rounded-3xl p-6">
            <Flame size={64} color={colors.primary} strokeWidth={1.5} />
          </View>

          <View className="items-center gap-2">
            <Text className="text-foreground text-4xl font-bold tracking-tight">
              CaloFit
            </Text>
            <Text className="text-muted-foreground text-base text-center leading-6">
              Track calories, log workouts,{"\n"}and reach your goals.
            </Text>
          </View>
        </View>

        {/* CTA Buttons */}
        <View className="gap-3">
          <Button
            title="Get Started"
            onPress={() => router.push("/(auth)/register")}
          />
          <Button
            title="Sign In"
            variant="outline"
            onPress={() => router.push("/(auth)/login")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
