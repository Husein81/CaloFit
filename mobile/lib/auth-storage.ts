import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "access_token";

export const authStorage = {
  getToken: () => AsyncStorage.getItem(ACCESS_TOKEN_KEY),
  setToken: (token: string) => AsyncStorage.setItem(ACCESS_TOKEN_KEY, token),
  clearToken: () => AsyncStorage.removeItem(ACCESS_TOKEN_KEY),
};
