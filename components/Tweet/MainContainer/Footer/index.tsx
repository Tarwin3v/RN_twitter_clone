import React from "react";
import { Text, View, Image } from "react-native";
import { AntDesign, EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { TweetType } from "../../../../types";

export type FooterProps = {
  tweet: TweetType;
};

export const Footer = ({ tweet }: FooterProps) => (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <EvilIcons name="comment" size={30} color="grey" />
      <Text style={styles.number}>{tweet.commentsCount}</Text>
    </View>
    <View style={styles.iconContainer}>
      <EvilIcons name="retweet" size={30} color="grey" />
      <Text style={styles.number}>{tweet.retweetsCount}</Text>
    </View>
    <View style={styles.iconContainer}>
      <EvilIcons name="heart" size={30} color="grey" />
      <Text style={styles.number}>{tweet.likesCount}</Text>
    </View>
    <View style={styles.iconContainer}>
      <EvilIcons name="share-google" size={30} color="grey" />
      <Text style={styles.number}>{tweet.commentsCount}</Text>
    </View>
  </View>
);
