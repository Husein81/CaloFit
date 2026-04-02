// Import directly from build/ — the providers/google.js re-export wrapper
// fails to resolve on Windows due to a Metro path separator bug.
import * as Google from "expo-auth-session/build/providers/Google";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/auth";
import { api } from "../lib/api";

// Required to dismiss the browser after the OAuth redirect completes
WebBrowser.maybeCompleteAuthSession();

type AuthResponse = { accessToken: string; refreshToken: string };

export function useGoogleAuth() {
  const { saveToken } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  });

  const mutation = useMutation({
    mutationFn: (accessToken: string) =>
      api.post<AuthResponse>("/auth/google", { accessToken }),
    onSuccess: (data) => saveToken(data.accessToken),
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      mutation.mutate(response.authentication.accessToken);
    }
  }, [response, mutation]);

  return {
    signInWithGoogle: () => promptAsync(),
    isPending: mutation.isPending,
    isReady: !!request,
    isError: mutation.isError || response?.type === "error",
    error: mutation.error,
  };
}
