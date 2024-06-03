import { UserType } from "@/types/user";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface Isession {
  user: UserType | null;
  saveUser: (user: UserType) => void;
  removeUser: () => void;
}

export const useSession = create<Isession>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        saveUser: (user: UserType) => set({ user }),
        removeUser: () => set({ user: null }),
      }),
      { name: "user-session", storage: createJSONStorage(() => AsyncStorage) }
    )
  )
);
