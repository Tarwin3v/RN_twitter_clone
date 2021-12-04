import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import { createTweet } from "../graphql/mutations";

const TweetScreen = () => {
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need roll permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) setImage(result.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    let result;
    try {
      const res = await fetch(image);
      const blob = await res.blob();
      const imageNameArray = image.split(".");
      const extension = imageNameArray[imageNameArray.length - 1];
      const imageKey = `${uuid()}.${extension}`;
      result = await Storage.put(imageKey, blob);
    } catch (error) {
      console.log(error);
    }
    return result;
  };

  const onPost = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      let imageID;
      if (image) {
        imageID = await uploadImage();
      }

      const tweet = {
        content: post,
        image: imageID ? imageID.key : "",
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
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.imageInput}>Pick an image</Text>
          </TouchableOpacity>
          {!!image && (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          )}
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
  imageInput: {
    fontSize: 18,
    color: Colors.light.tint,
    marginVertical: 10,
  },
  imagePreview: {
    width: 150,
    height: 150,
  },
});

export default TweetScreen;
