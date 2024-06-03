import { UserService } from "@/actions/user-service";
import { InputValidated } from "@/components/ui/input-validated";
import { PressButton } from "@/components/ui/press-button";
import { useSession } from "@/store/session";
import { formEditProfileSchema } from "@/validators/form-edit-profile-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

export const FormEditProfile: FC = () => {
  const { user, saveUser } = useSession();

  const { control, handleSubmit, getValues } = useForm<
    z.infer<typeof formEditProfileSchema>
  >({
    resolver: zodResolver(formEditProfileSchema),
    values: {
      username: user?.username || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      secondaryName: user?.secondaryName || "",
      password: user?.password || "",
      email: user?.email || "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: UserService.updateById,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Профиль успешно обновлен",
        visibilityTime: 2000,
      });

      saveUser(data);
    },
  });

  const handleOnSubmit = async () => {
    if (!user) return;

    await mutateAsync({
      email: getValues("email"),
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      password: getValues("password"),
      secondaryName: getValues("secondaryName"),
      username: getValues("username"),
      id: user?.id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_inner}>
        <InputValidated
          label="Имя пользователя"
          name="username"
          control={control}
          placeholder="Имя пользователя"
        />

        <InputValidated
          label="Имя"
          name="firstName"
          control={control}
          placeholder="Имя"
        />

        <InputValidated
          label="Фамилия"
          name="lastName"
          control={control}
          placeholder="Фамилия"
        />

        <InputValidated
          name="secondaryName"
          control={control}
          placeholder="Отчество"
          label="Отчество"
        />
        <InputValidated
          name="email"
          control={control}
          placeholder="Электронный адрес"
          label="Электронный адрес"
        />
        <InputValidated
          name="password"
          control={control}
          placeholder="Пароль"
          label="Пароль"
        />
      </View>

      <PressButton onPress={handleSubmit(handleOnSubmit)}>
        Сохранить
      </PressButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  container_inner: {
    gap: 10,
  },

  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#101010",
    paddingVertical: 20,
  },

  button_text: {
    textAlign: "center",
    color: "white",
  },
});
