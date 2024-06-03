import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MaskInput, { Masks, useMaskedInputProps } from "react-native-mask-input";
import { InputValidated } from "../ui/input-validated";
import { PressButton } from "../ui/press-button";
import { formAddCardSchema } from "@/validators/form-add-card-validator";
import { z } from "zod";

export const FormAddCard: FC = () => {
  const [creditCard, setCreditCard] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const { control, handleSubmit } = useForm<z.infer<typeof formAddCardSchema>>({
    resolver: zodResolver(formAddCardSchema),
  });

  return (
    <View style={styles.container}>
      <View>
        <InputValidated
          label="Владелец карты"
          control={control}
          name="name"
          placeholder="Иван Иванов Иванович"
        />
      </View>
      <View style={{ gap: 5 }}>
        <Text style={styles.text_label}>Номер карты</Text>
        <Controller
          control={control}
          name="cardNumber"
          render={({ field, fieldState: { error } }) => (
            <View>
              <MaskInput
                //   {...field}
                mask={Masks.CREDIT_CARD}
                style={styles.input}
                value={field.value}
                onChangeText={field.onChange}
              />
              {error && <Text style={styles.text_error}>{error?.message}</Text>}
            </View>
          )}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ gap: 5 }}>
          <Text style={styles.text_label}>Дата окончания</Text>
          <Controller
            control={control}
            name="expiryDate"
            render={({ field, fieldState: { error } }) => (
              <View>
                <MaskInput
                  //   {...field}
                  mask={Masks.DATE_MMDDYYYY}
                  style={styles.input}
                  value={field.value}
                  onChangeText={field.onChange}
                />
                {error && (
                  <Text style={styles.text_error}>{error?.message}</Text>
                )}
              </View>
            )}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text style={styles.text_label}>CVC</Text>
          <MaskInput
            style={styles.input}
            value={cvc}
            onChangeText={setCvc}
            mask={[" ", " ", " "]}
          />
        </View>
      </View>

      <View style={{}}>
        <PressButton onPress={handleSubmit((data) => console.log(data))}>
          Добавить
        </PressButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    position: 'relative'
  },

  text_label: {
    color: "#c8c6c5",
  },

  text_error: {
    color: "red",
    position: 'absolute',
    top: 50,
    width: 160
  },
});
