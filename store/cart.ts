import { SneakerType } from "@/types/sneaker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export type SneakerCartType = SneakerType & { sizeName: string };

interface ICartStore {
  sneakers: SneakerCartType[];
  totalPrice: number;
  addToCart: (sneaker: SneakerCartType) => void;
  removeFromCart: (sneaker: SneakerCartType) => void;
  clearCart: () => void;
}


export const useCart = create<ICartStore>()(
  devtools(
    persist(
      (set) => ({
        sneakers: [],
        totalPrice: 0,
        addToCart: (sneaker) =>
          set((state) => ({
            sneakers: [...state.sneakers, sneaker],
            totalPrice: state.totalPrice + sneaker.price,
          })),
        removeFromCart: (sneaker) =>
          set((state) => ({
            sneakers: state.sneakers.filter((s) => s !== sneaker),
            totalPrice: state.totalPrice - sneaker.price,
          })),
        clearCart: () => set({ sneakers: [], totalPrice: 0 }),
      }),
      { name: "cart-store", storage: createJSONStorage(() => AsyncStorage) }
    )
  )
);
