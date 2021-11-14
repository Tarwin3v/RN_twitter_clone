import React from "react";
import { View } from "react-native";
import { UserType } from "../../../types";
import ProfilePicture from "../../ProfilePicture";
import styles from "./styles";

export type LeftContainerProps = {
  user: UserType;
};

export const LeftContainer = ({ user }: LeftContainerProps) => (
  <View>
    <ProfilePicture image={user.image} size={60} />
  </View>
);
