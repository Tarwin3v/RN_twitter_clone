import React, { useEffect, useState, useRef } from "react";
import { FlatList } from "react-native";
import { View } from "react-native";
import Tweet from "../Tweet";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listTweets } from "../../graphql/queries";
import { onCreateTweet } from "../../graphql/subscriptions";

export const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  let subscription;

  const subscriptions = () => {
    subscription = API.graphql(graphqlOperation(onCreateTweet)).subscribe({
      next: () => {
        getTweets();
      },
    });
  };

  const getTweets = async () => {
    setLoading(true);
    try {
      const tweetsData = await API.graphql(graphqlOperation(listTweets));
      setTweets(tweetsData.data.listTweets.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  useEffect(() => {
    subscriptions();
    return () => {
      subscription.unsubscribe();
    };
  });

  const propComparator = (propName) => (a, b) =>
    a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1;

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <FlatList
        data={tweets.sort(propComparator("createdAt"))}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={getTweets}
      />
    </View>
  );
};
