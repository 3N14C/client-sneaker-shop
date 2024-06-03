import { AddressType } from "@/types/address";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IAddressStore {
  address: AddressType | null;
  saveAddress: (address: AddressType) => void;
  removeAddress: (address: AddressType) => void;
}

export const useAddress = create<IAddressStore>()(
  devtools(
    persist(
      (set) => ({
        address: null,
        saveAddress: (address: AddressType) => set({ address }),
        removeAddress: (address: AddressType) => set({ address: null }),
      }),

      { name: "address-store", storage: createJSONStorage(() => AsyncStorage) }
    )
  )
);
