import { UserService } from "@/actions/user-service";
import { useSession } from "@/store/session";
import { formSignInUser } from "@/validators/form-sign-in-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { Eye, EyeOff, Mail } from "lucide-react-native";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { z } from "zod";
import { TabBarIcon } from "../navigation/TabBarIcon";
import Toast from "react-native-toast-message";

export const SignInForm: FC = () => {
  const { saveUser } = useSession();
  const [focusedEmail, setFocusedEmail] = useState<boolean>(false);
  const [focusedPassword, setFocusedPassword] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSignInUser>>({
    resolver: zodResolver(formSignInUser),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: UserService.signIn,
    onSuccess: (data) => {
      if (!data) return;
      router.replace("/(tabs)");
      saveUser(data);
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Неверный логин или пароль",
        visibilityTime: 3000,
      });
      console.log(error.name);
    },
  });

  const handleOnSubmit = async () => {
    await mutateAsync({
      email: getValues("email"),
      password: getValues("password"),
    });
  };

  return (
    <View>
      <View style={styles.input_fileds}>
        <View
          style={{
            ...styles.input_filed_item,
            borderColor: focusedEmail ? "black" : "lightgray",
            paddingVertical: focusedEmail ? 15 : 10,
          }}
        >
          <Mail
            color={focusedEmail ? "black" : "lightgray"}
            style={{ marginRight: 10 }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onFocus={() => setFocusedEmail(true)}
                onBlur={() => setFocusedEmail(false)}
                style={styles.input}
                placeholder="Электронный адрес"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
        </View>
        {errors.email && <Text style={{}}>{errors.email.message}</Text>}

        <View
          style={{
            ...styles.input_filed_item,
            borderColor: focusedPassword ? "black" : "lightgray",
            paddingVertical: focusedPassword ? 15 : 10,
          }}
        >
          <TabBarIcon
            name="lock"
            style={{ marginRight: 10 }}
            color={focusedPassword ? "black" : "lightgray"}
          />
          <Controller
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCapitalize="none"
                onFocus={() => setFocusedPassword(true)}
                onBlur={() => setFocusedPassword(false)}
                secureTextEntry={secureTextEntry}
                style={styles.input}
                placeholder="*****"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {secureTextEntry ? (
            <EyeOff color={focusedPassword ? "black" : "lightgray"} />
          ) : (
            <Eye color={focusedPassword ? "black" : "lightgray"} />
          )}
        </View>
        {errors.password && <Text style={{}}>{errors.password.message}</Text>}
      </View>

      <TouchableHighlight
        disabled={isPending}
        style={styles.touch_button}
        underlayColor={"#393939"}
        onPress={handleSubmit(handleOnSubmit)}
      >
        {/* <Text style={styles.touch_button_title}>Войти</Text> */}
        {isPending ? (
          <Text style={styles.touch_button_title}>Загрузка...</Text>
        ) : (
          <Text style={styles.touch_button_title}>Войти</Text>
        )}
      </TouchableHighlight>

      <View style={styles.another_block}>
        <View style={styles.register_block}>
          <Text style={styles.register_title}>Нет аккаунта?</Text>
          <Link href={"/sign-up"} style={styles.register_button}>
            Создать
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  touch_button: {
    marginTop: 140,
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
    borderRadius: 50,
  },

  touch_button_title: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },

  text_reset_password: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
    alignItems: "center",
  },

  another_block: {
    marginTop: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  register_block: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  register_title: {
    color: "#9e9e9e",
    fontWeight: "400",
    fontSize: 15,
  },

  register_button: {
    marginLeft: 10,
    color: "black",
    fontWeight: "600",
  },

  input_fileds: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  input_filed_item: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: 350,
    borderColor: "lightgray",
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
});
