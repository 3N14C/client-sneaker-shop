import { useSession } from "@/store/session";
import { router } from "expo-router";
import { ChevronRight, CreditCard, LogOut, User } from "lucide-react-native";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export const ProfileSettings: FC = () => {
  const { removeUser } = useSession();

  const handleLogout = () => {
    removeUser();
    Toast.show({
      type: "success",
      text1: "Вы вышли из аккаунта",
      visibilityTime: 2000,
    });
    router.replace("/(auth)/sign-in");
  };

  return (
    <View
      style={{
        ...styles.profileSettings,
      }}
    >
      <TouchableOpacity
        onPress={() => router.push('/profile/edit-profile')}
      >
        <View
          style={{
            ...styles.profileSettingsItems,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <User color={"rgb(69, 69, 69)"} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "rgb(69, 69, 69)",
              }}
            >
              Редактировать
            </Text>
          </View>

          <ChevronRight color={"rgb(69, 69, 69)"} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/profile/payment")}
      >
        <View
          style={{
            ...styles.profileSettingsItems,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <CreditCard color={"rgb(69, 69, 69)"} size={20} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "rgb(69, 69, 69)",
              }}
            >
              Оплата
            </Text>
          </View>

          <ChevronRight color={"rgb(69, 69, 69)"} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}>
        <View
          style={{
            ...styles.profileSettingsItems,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <LogOut color={"rgb(249, 130, 130)"} size={20} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "rgb(249, 130, 130)",
              }}
            >
              Выйти
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSettings: {
    flexDirection: "column",
    gap: 20,
  },
  profileSettingsItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
