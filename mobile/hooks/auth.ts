import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/auth";
import { api } from "../lib/api";

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export function useLogin() {
  const { saveToken } = useAuth();
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      api.post<AuthResponse>("/auth/login", data),
    onSuccess: (data) => saveToken(data.accessToken),
  });
}

export function useRegister() {
  const { saveToken } = useAuth();
  return useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      api.post<AuthResponse>("/auth/register", data),
    onSuccess: (data) => saveToken(data.accessToken),
  });
}
