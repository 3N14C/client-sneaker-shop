import { OrderService } from "@/actions/order-service";
import { PaymentService } from "@/actions/payment-service";
import { ModalAddress } from "@/components/ui/modals/modal-address";
import { PressButton } from "@/components/ui/press-button";
import { SneakerCheckoutCard } from "@/components/ui/sneaker-checkout-card";
import { axiosInstance } from "@/config/axios-config";
import { useCurrentPrice } from "@/hooks/use-current-price";
import { useAddress } from "@/store/address";
import { useCart } from "@/store/cart";
import { useSession } from "@/store/session";
import { useStripe } from "@stripe/stripe-react-native";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { MapPin, Pencil } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Index = () => {
  const { user } = useSession();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const currentPrice = useCurrentPrice();
  const { address } = useAddress();
  const { sneakers, totalPrice, clearCart } = useCart();
  const [open, setOpen] = useState<boolean>(false);
  const totalSum = totalPrice * currentPrice;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: OrderService.create,
  });

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await PaymentService.create({ totalSum });

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Sneaker Market",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
  };

  const openPaymentSheet = async () => {
    if (!user?.firstName || !user?.lastName || !user?.secondaryName) {
      Toast.show({
        type: "error",
        text1: "Вы не заполнили контактную информацию",
        text2: "Пожалуйста, заполните свой профиль",
      });

      return router.replace("/profile/edit-profile");
    }

    const { error } = await presentPaymentSheet();

    if (!error) {
      if (!address) return;
      if (!user) return;

      await mutateAsync({
        city: address.city,
        street: address.street,
        orderSum: totalSum,
        sneakerId: sneakers.map((sneaker) => sneaker.id),
        userId: user?.id,
      });
      Toast.show({
        type: "success",
        text1: "Оплата прошла успешно",
        text2: "Товары будут доставлены в ближайшее время",
      });
      clearCart();
      return router.replace("/profile/payment");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, [totalSum]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Text style={{ ...styles.addressTitle }}>Адрес доставки</Text>
        <ModalAddress open={open} onClose={() => setOpen(false)} />
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={{
            ...styles.address,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#ccc",
                padding: 5,
                borderRadius: 50,
              }}
            >
              <MapPin
                size={20}
                color="white"
                style={{
                  backgroundColor: "black",
                  paddingVertical: 3,
                  paddingHorizontal: 8,
                  borderRadius: 50,
                }}
              />
            </View>

            {address ? (
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {address.city}
                </Text>

                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Text style={{ ...styles.addressDescr }}>
                    {address.street}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={{ ...styles.addressDescr, color: "#000" }}>
                Укажите адрес
              </Text>
            )}

            <TouchableOpacity>
              <Pencil size={18} color="black" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ ...styles.line }} />

      <View style={{ ...styles.orderContainer }}>
        <Text style={{ ...styles.addressTitle }}>Список товаров</Text>

        <SneakerCheckoutCard />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: "#ccc",
            }}
          >
            Итог
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: "gray",
            }}
          >
            {(totalPrice * currentPrice).toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
            })}
          </Text>
        </View>
        <PressButton onPress={openPaymentSheet}>Перейти к оплате</PressButton>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "rgb(251, 251, 251)",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 40,
  },

  addressTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  address: {
    marginVertical: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  addressDescr: {
    color: "#ccc",
    fontSize: 12,
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  orderContainer: {
    marginVertical: 30,
  },

  sneakerPrice: {
    color: "#101010",
    fontSize: 17,
    fontWeight: "bold",
  },

  containerOrder: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    width: "110%",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    borderTopWidth: 0.2,
    borderColor: "rgba(0,0,0,0.1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 120,
    alignItems: "center",
  },
});
