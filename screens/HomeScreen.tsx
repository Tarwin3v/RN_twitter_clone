import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { View } from "react-native";
import Tweet from "../components/Tweet";
import { RootTabScreenProps } from "../types";
import { tweets } from "../data/tweets";
import { Feed } from "../components/Feed";
import TweetButton from "../components/TweetButton";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Feed />
      <TweetButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
