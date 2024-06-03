import { SneakerType } from "@/types/sneaker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

interface IFavoriteStore {
  sneakers: SneakerType[];
  addToFavorite: (sneaker: SneakerType) => void;
}

export const useFavoriteStore = create<IFavoriteStore>()(
  devtools(
    persist(
      (set) => ({
        sneakers: [],
        addToFavorite: (sneaker) =>
          set((state) => {
            const existItem = state.sneakers.find((i) => i.id === sneaker.id);
            if (existItem) {
              return {
                sneakers: state.sneakers.filter((i) => i.id !== sneaker.id),
              };
            } else {
              return {
                sneakers: [...state.sneakers, { ...sneaker }],
              };
            }
          }),
      }),
      { name: "favorite-store", storage: createJSONStorage(() => AsyncStorage) }
    )
  )
);
