import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../../context/theme";
import { useGoogleAuth } from "../../hooks/google-auth";
import { BottomSheet } from "../ui/bottom-sheet";

interface SocialAuthSheetProps {
  visible: boolean;
  onClose: () => void;
}

export function SocialAuthSheet({ visible, onClose }: SocialAuthSheetProps) {
  const { colors } = useTheme();
  const { signInWithGoogle, isPending, isReady, isError, error } =
    useGoogleAuth();

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Or continue with">
      <View style={styles.container}>
        <Pressable
          onPress={() => signInWithGoogle()}
          disabled={!isReady || isPending}
          style={[
            styles.socialButton,
            {
              backgroundColor: colors.background,
              borderColor: colors.muted,
              opacity: !isReady || isPending ? 0.6 : 1,
            },
          ]}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={colors.foreground} />
          ) : (
            <AntDesign name="google" size={20} color="#DB4437" />
          )}
          <Text style={[styles.socialLabel, { color: colors.foreground }]}>
            Continue with Google
          </Text>
        </Pressable>

        {isError && (
          <Text style={styles.errorText}>
            {error?.message ?? "Google sign-in failed. Please try again."}
          </Text>
        )}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  socialLabel: {
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
  },
});
