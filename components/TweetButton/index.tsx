import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";

const TweetButton = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("TweetScreen");
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={onPress}
    >
      <MaterialCommunityIcons name="feather" size={35} color="white" />
    </TouchableOpacity>
  );
};

export default TweetButton;
