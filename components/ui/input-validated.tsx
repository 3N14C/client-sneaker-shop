import { FC } from "react";
import { useController } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

interface IProps {
  name: string;
  control: any;
  placeholder: string;
  label?: string
}

export const InputValidated: FC<IProps> = ({
  name,
  control,
  placeholder,
  label
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    defaultValue: "",
    name,
  });

  return (
    <View>
      <Text style={styles.text_label}>
        {label}
      </Text>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        style={styles.input}
        placeholder={placeholder}
      />
      {error && <Text style={styles.text_error}>{error?.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  text_error: {
    color: "red",
  },

  text_label: {
    color: "#c8c6c5",
  },
});
