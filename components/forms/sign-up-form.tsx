import { formSignUpUser } from "@/validators/form-sign-up-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
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
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/actions/user-service";
import { useSession } from "@/store/session";
import { Eye, EyeOff, Mail } from "lucide-react-native";

export const SignUpForm: FC = () => {
  const { saveUser } = useSession();
  const [focusedUsername, setFocusedUsername] = useState<boolean>(false);
  const [focusedEmail, setFocusedEmail] = useState<boolean>(false);
  const [focusedPassword, setFocusedPassword] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSignUpUser>>({
    resolver: zodResolver(formSignUpUser),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: UserService.signUp,
    onSuccess: (data) => {
      router.replace("/(tabs)");
      saveUser(data);
    },
  });

  const handleOnSubmit = async () => {
    await mutateAsync({
      email: getValues("email"),
      password: getValues("password"),
      username: getValues("username"),
    });
  };

  return (
    <View>
      <View style={styles.input_fileds}>
        <View
          style={{
            ...styles.input_filed_item,
            borderColor: focusedUsername ? "black" : "lightgray",
            paddingVertical: focusedUsername ? 15 : 10,
          }}
        >
          <TabBarIcon
            name="user"
            style={{ marginRight: 10 }}
            color={focusedPassword ? "black" : "lightgray"}
          />
          <Controller
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCapitalize="none"
                onFocus={() => setFocusedUsername(true)}
                onBlur={() => setFocusedUsername(false)}
                style={styles.input}
                placeholder="username"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
        </View>
        {errors.username && <Text>{errors.username.message}</Text>}

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
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onFocus={() => setFocusedEmail(true)}
                onBlur={() => setFocusedEmail(false)}
                style={styles.input}
                placeholder="Email"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
        </View>
        {errors.email && <Text>{errors.email.message}</Text>}

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
                placeholder="Password"
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
        {errors.password && <Text>{errors.password.message}</Text>}
      </View>

      <TouchableHighlight
        disabled={isPending}
        style={styles.touch_button}
        underlayColor={"#393939"}
        onPress={handleSubmit(handleOnSubmit)}
      >
        {/* <Text style={styles.touch_button_title}>Создать аккаунт</Text> */}
        {isPending ? (
          <Text style={styles.touch_button_title}>Загрузка...</Text>
        ) : (
          <Text style={styles.touch_button_title}>Создать аккаунт</Text>
        )}
      </TouchableHighlight>

      <View style={styles.another_block}>
        <View style={styles.register_block}>
          <Text style={styles.register_title}>Уже есть аккаунт?</Text>
          <Link href={"/sign-in"} style={styles.register_button}>
            Войти
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

  touch_button: {
    marginTop: 70,
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

  another_block: {
    marginTop: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  register_block: {
    // marginTop: 40,
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
});
