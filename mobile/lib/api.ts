import Constants from "expo-constants";
import { Platform } from "react-native";
import { authStorage } from "./auth-storage";

function getBaseUrl(): string {
  // Explicit override — use this in production or to pin a specific address.
  console.log("API URL:", process.env.EXPO_PUBLIC_API_URL);
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // When running in Expo Go or a dev client, Constants.expoConfig.hostUri is
  // set at runtime to the Metro server address, e.g. "192.168.1.5:8081".
  // Re-using that host with the API port works on emulators AND physical devices
  // without any manual IP configuration.
  const metroHost = Constants.expoConfig?.hostUri?.split(":")[0];
  if (metroHost) {
    return `http://${metroHost}:5000`;
  }

  // Last-resort fallbacks for bare environments with no Metro host.
  return Platform.OS === "android"
    ? "http://10.0.2.2:5000" // Android emulator → host machine
    : "http://localhost:5000"; // iOS simulator
}

const BASE_URL = getBaseUrl();

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await authStorage.getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string>),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? "Request failed");
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
