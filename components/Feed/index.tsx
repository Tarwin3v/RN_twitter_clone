import React from "react";
import { FlatList } from "react-native";
import { tweets } from "../../data/tweets";
import { View } from "react-native";
import Tweet from "../Tweet";

export type FeedProps = {};

export const Feed = (props: FeedProps) => (
  <View style={{ width: "100%" }}>
    <FlatList
      data={tweets}
      renderItem={({ item }) => <Tweet tweet={item} />}
      keyExtractor={(item) => item.id}
    />
  </View>
);
