import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { AntDesign, EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { API, graphqlOperation, Auth } from "aws-amplify";

import styles from "./styles";
import { TweetType } from "../../../../types";
import { createLike, deleteLike } from "../../../../graphql/mutations";
import { User } from "../../../../API";

export type FooterProps = {
  tweet: TweetType;
};

export const Footer = ({ tweet }: FooterProps) => {
  const [user, setUser] = useState(null);
  const [like, setLike] = useState(null);
  const [likesCount, setLikesCount] = useState(tweet.likes.items.length);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    setUser(currentUser);
    const isLiked = tweet.likes.items.find(
      (like) => like.userID === currentUser.attributes.sub
    );
    setLike(isLiked);
  };

  const onLike = async () => {
    if (!user) return;
    !like ? await newLike() : await removeLike();
  };

  const newLike = async () => {
    const newLike = {
      userID: user.attributes.sub,
      tweetID: tweet.id,
    };

    try {
      const res = await API.graphql(
        graphqlOperation(createLike, { input: newLike })
      );
      setLike(res.data.createLike);
      setLikesCount(likesCount + 1);
    } catch (error) {
      console.error(error);
    }
  };
  const removeLike = async () => {
    try {
      const res = await API.graphql(
        graphqlOperation(deleteLike, { input: { id: like.id } })
      );
      setLikesCount(likesCount - 1);
      setLike(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <EvilIcons name="comment" size={30} color="grey" />
        </TouchableOpacity>
        <Text style={styles.number}>{tweet.commentsCount}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <EvilIcons name="retweet" size={30} color="grey" />
        </TouchableOpacity>
        <Text style={styles.number}>{tweet.retweetsCount}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onLike}>
          <AntDesign
            name={!like ? "hearto" : "heart"}
            size={24}
            color={!like ? "grey" : "red"}
          />
        </TouchableOpacity>
        <Text style={styles.number}>{likesCount}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <EvilIcons name="share-google" size={30} color="grey" />
        </TouchableOpacity>
        <Text style={styles.number}>{tweet.commentsCount}</Text>
      </View>
    </View>
  );
};
