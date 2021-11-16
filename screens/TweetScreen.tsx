import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { createTweet } from "../graphql/mutations";

const TweetScreen = () => {
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  const onPost = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      const tweet = {
        content: post,
        image: image,
        userID: currentUser.attributes.sub,
      };
      await API.graphql(graphqlOperation(createTweet, { input: tweet }));
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} color={Colors.light.tint} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPost}>
          <Text style={styles.buttonText} onPress={onPost}>
            Tweet
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tweetContainer}>
        <ProfilePicture
          image={
            "https://cdn.pixabay.com/photo/2020/12/12/17/24/little-egret-5826070_960_720.jpg"
          }
          size={45}
        />
        <View style={styles.inputsContainer}>
          <TextInput
            value={post}
            onChangeText={(e) => setPost(e)}
            placeholder="Write something"
            style={styles.textInput}
            multiline
            numberOfLines={5}
          />
          <TextInput
            value={image}
            onChangeText={(e) => setImage(e)}
            placeholder="Image url"
            style={styles.imageInput}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 15,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  tweetContainer: {
    flexDirection: "row",
    width: "100%",
  },
  inputsContainer: {
    margin: 10,
    flex: 1,
  },
  textInput: {
    maxHeight: 300,
    fontSize: 18,
    textAlignVertical: "top",
  },
  imageInput: {},
});

export default TweetScreen;
