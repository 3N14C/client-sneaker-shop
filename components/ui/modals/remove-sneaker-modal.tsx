import { useCart } from "@/store/cart";
import { SneakerType } from "@/types/sneaker";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal, { ModalContent } from "react-native-modals";
import Toast from "react-native-toast-message";

interface IProps {
  sneaker: SneakerType & { sizeName: string };
  isVisible: boolean;
  onClose: () => void;
}

export const RemoveSneakerModal: FC<IProps> = ({
  isVisible,
  onClose,
  sneaker,
}) => {
  const { removeFromCart } = useCart();

  const handleRemove = (sneaker: SneakerType & { sizeName: string }) => {
    Toast.show({
      type: "success",
      text1: "Товар удален из корзины",
      visibilityTime: 2000,
    });
    removeFromCart(sneaker);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      onTouchOutside={onClose}
      onDismiss={onClose}
      style={styles.modal}
    >
      <ModalContent style={styles.content}>
        <Text style={styles.title}>
          Вы действительно хотите удалить данный товар из корзины?
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Отмена</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleRemove(sneaker)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Удалить</Text>
          </TouchableOpacity>
        </View>
      </ModalContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    // position: "absolute",
    // backgroundColor: "rgba(0,0,0,0.5)",
    // opacity: 10,
    // maxHeight: 200,
    // zIndex: 9999,
  },
  content: {
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
