import { useSession } from "@/store/session";
import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TabBarIcon } from "../../navigation/TabBarIcon";
import { Bell, Heart, MessageCircle } from "lucide-react-native";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/actions/user-service";

export const Header: FC = () => {
  const { user } = useSession();

  const { data: currentUser } = useQuery({
    queryKey: ["user-by-id", user?.id],
    queryFn: () => UserService.getById({ id: user?.id ?? "" }),
  });


  if (!user) return null;

  return (
    <View style={{ marginTop: 40 }}>
      <View style={styles.container_inner}>
        <View style={styles.profile}>
          <Image
            style={{ width: 35, height: 35, borderRadius: 50 }}
            source={{ uri: "https://picsum.photos/200" }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>С возвращением 👋</Text>
            <Text style={styles.username}>{user?.username}</Text>
          </View>
        </View>

        <View style={styles.toolbar}>
          <Pressable onPress={() => router.push(`/chat/${currentUser?.chat?.[0].id}`)}>
            <MessageCircle color={"black"} />
          </Pressable>
          <Pressable onPress={() => router.push("/favorite")}>
            <Heart color={"black"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    gap: 20,
  },
});
