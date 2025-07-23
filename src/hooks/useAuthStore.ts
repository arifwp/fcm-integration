import { convertToSeconds } from "@/utils/time";
import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  setAccessToken: (token: string, duration?: string) => void;
  clearAccessToken: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAccessToken: (token, duration = "1h") => {
    set({ accessToken: token });

    const maxAge = convertToSeconds(duration);

    document.cookie = `auth-token=${token}; path=/; max-age=${maxAge}`;
  },
  clearAccessToken: () => {
    set({ accessToken: null });
    document.cookie = "auth-token=; path=/; max-age=0";
  },
}));
