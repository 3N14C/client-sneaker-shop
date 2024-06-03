import { CategoryService } from "@/actions/category-service";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

interface IProps {
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
}

export const PopularNavbar: FC<IProps> = ({ categoryId, setCategoryId }) => {
  const { data: categories } = useQuery({
    queryKey: ["all-categories"],
    queryFn: CategoryService.getAll,
  });

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.scrollbar}>
          <Text
            onPress={() => setCategoryId("Все")}
            style={{
              color: categoryId === "Все" ? "white" : "black",
              backgroundColor: categoryId === "Все" ? "black" : "white",
              ...styles.scrollbar_item,
              marginRight: 15,
              textAlign: "center",
              alignItems: "center",
            }}
          >
            Все
          </Text>

          {categories?.map((category, idx) => (
            <TouchableHighlight
              underlayColor={"transparent"}
              key={category.id}
              onPress={() => setCategoryId(category.id)}
            >
              <View
                style={{
                  ...styles.scrollbar_item,
                  marginLeft: idx !== 0 ? 15 : 0,
                  backgroundColor:
                    categoryId === category.id ? "black" : "white",
                }}
              >
                <Text
                  style={{
                    color: categoryId === category.id ? "white" : "black",
                  }}
                >
                  {category.name}
                </Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  scrollbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  scrollbar_item: {
    borderColor: "black",
    borderWidth: 1.5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
  },
});
