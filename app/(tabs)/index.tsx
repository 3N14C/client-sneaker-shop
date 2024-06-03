import { Category } from "@/components/tabs/home/category";
import { Header } from "@/components/tabs/home/header";
import { Offer } from "@/components/tabs/home/offer";
import { Popular } from "@/components/tabs/home/popular";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Header />

        <View>
          <View style={styles.offer}>
            <Text style={styles.title}>Специальные предложения</Text>

            <TouchableHighlight
              underlayColor={"transparent"}
              onPress={() => router.push("/offers")}
            >
              <Text
                style={{
                  ...styles.title,
                  fontSize: 15,
                  maxWidth: "100%",
                  padding: 20,
                }}
              >
                Посмотреть все
              </Text>
            </TouchableHighlight>
          </View>

          <Offer />

          <Category />

          <Popular />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    height: "100%",
    backgroundColor: "#fff",
  },

  container_inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    color: "gray",
  },

  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    maxWidth: "40%",
    fontSize: 20,
    fontWeight: "bold",
  },

  offer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
