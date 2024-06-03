import { SignUpForm } from "@/components/forms/sign-up-form";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";

const Index = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerInner}>
        <Animated.View style={[{ opacity: fadeAnim }]}>
          <Text style={styles.title}>Создать аккаунт</Text>
        </Animated.View>

        <View>
          <SignUpForm />
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",

    marginHorizontal: 10,
  },

  containerInner: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
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
