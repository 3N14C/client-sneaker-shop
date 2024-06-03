import { CategoryService } from "@/actions/category-service";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Category: FC = () => {
  const { data: categories } = useQuery({
    queryKey: ["all-categories"],
    queryFn: CategoryService.getAll,
  });

  return (
    <View style={styles.brand_container}>
      {categories?.map((category, idx) => (
        <View key={category.id}>
          <TouchableOpacity
            onPress={() => router.push(`/category/${category.id}`)}
          >
            <View>
              <View style={styles.logo}>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={{ uri: category.img }}
                />
              </View>
              <Text style={styles.text}>
                {category.name.length > 6
                  ? `${category.name.slice(0, 6)}...`
                  : category.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    borderRadius: 50,
    backgroundColor: "#ececec",
    padding: 10,
    alignItems: "center",
  },

  brand_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    // flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 30,
  },

  text: {
    textAlign: "center",
    textTransform: "capitalize",
  },
});
