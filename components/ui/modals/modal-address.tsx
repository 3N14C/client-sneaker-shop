import { useAddress } from "@/store/address";
import { addressSchema } from "@/validators/address-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text } from "react-native";
import { BottomModal, ModalContent } from "react-native-modals";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { InputValidated } from "../input-validated";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const ModalAddress: FC<IProps> = ({ open, onClose }) => {
  const { address, saveAddress } = useAddress();

  const { control, handleSubmit } = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    values: {
      city: address?.city || "",
      street: address?.street || "",
    },
  });

  const handleSaveAddress = (data: z.infer<typeof addressSchema>) => {
    if (address) {
      saveAddress({
        ...data,
      });
      Toast.show({
        type: "success",
        text1: "Адрес успешно изменен",
        visibilityTime: 2000,
      });
      onClose();
    }

    saveAddress({
      ...data,
    });

    Toast.show({
      type: "success",
      text1: "Адрес успешно сохранен",
      visibilityTime: 2000,
    });
    onClose();
  };

  if (!open) return null;

  return (
    <BottomModal visible={open} onTouchOutside={onClose} onSwipeOut={onClose}>
      <ModalContent style={styles.modalContainer}>
        <InputValidated
          label="Город"
          control={control}
          name="city"
          placeholder="Город"
        />
        <InputValidated
          label="Улица"
          control={control}
          name="street"
          placeholder="Улица"
        />

        <Pressable
          style={styles.button}
          onPress={handleSubmit(handleSaveAddress)}
        >
          <Text style={styles.button_text}>Сохранить</Text>
        </Pressable>
      </ModalContent>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    gap: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  button: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    paddingVertical: 15,
    marginBottom: 10,
    backgroundColor: "black",
  },

  button_text: {
    textAlign: "center",
    color: "white",
  },

  text_error: {
    color: "red",
  },
});
