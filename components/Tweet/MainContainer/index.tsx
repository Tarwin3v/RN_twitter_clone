import React from "react";
import { Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { S3Image } from "aws-amplify-react-native";
import moment from "moment";
import styles from "./styles";
import { Footer } from "./Footer";
import { TweetType } from "../../../types";

export type MainContainerProps = {
  tweet: TweetType;
};

export const MainContainer = ({ tweet }: MainContainerProps) => (
  <View style={styles.container}>
    <View style={styles.tweetHeaderContainer}>
      <View style={styles.tweetHeaderNames}>
        <Text style={styles.name}>{tweet.user.name}</Text>
        <Text style={styles.username}>@{tweet.user.username}</Text>
        <Text style={styles.createdAt}>
          {moment(tweet.createdAt).fromNow()}
        </Text>
      </View>
      <Ionicons name="chevron-down" size={16} color="grey" />
    </View>
    <View>
      <Text style={styles.content}>{tweet.content}</Text>
      {!!tweet.image && <S3Image style={styles.image} imgKey={tweet.image} />}
    </View>
    <Footer tweet={tweet} />
  </View>
);
