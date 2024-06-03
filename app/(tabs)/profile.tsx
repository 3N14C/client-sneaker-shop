import { ProfileSettings } from "@/components/tabs/profile/profile-settings";
import { useSession } from "@/store/session";
import { Edit2 } from "lucide-react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Index = () => {
  const { user } = useSession();

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.containerInner,
        }}
      >
        <View>
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={require('@/assets/images/user-avatar.png')}
          />
          <TouchableOpacity
            onPress={() => {
              // handleImageUpload()
            }}
          >
            <Edit2
              style={{ position: "absolute", bottom: 0, right: 0 }}
              size={20}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.username}>{user?.username}</Text>
      </View>

      <View style={{ ...styles.line }} />

      <ProfileSettings />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },

  containerInner: {
    justifyContent: "center",
    alignItems: "center",
  },

  username: {
    fontWeight: "bold",
    fontSize: 20,
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 20,
  },
});
