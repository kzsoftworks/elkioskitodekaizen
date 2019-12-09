import React from "react";
import { Image, TouchableHighlight, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Text } from "react-native-ui-kitten";
import { PersonOutlineButton } from "../components/RoundButton";

const styles = StyleSheet.create({
  mainArea: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  picture: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 25,
  },
});

export const UserSpace = styled.View`
  padding-vertical: 60px;
  justify-content: center;
  align-items: center;
`;
export const UserName = styled.View`
  margin-bottom: 15px;
`;

export function ProfilePicture(onPersonButtonPressCallback, profilePictureUrl) {
  return (
    <TouchableHighlight
      onPress={onPersonButtonPressCallback}
      style={styles.mainArea}
    >
      <Image
        style={styles.picture}
        source={{
          uri: profilePictureUrl,
        }}
      />
    </TouchableHighlight>
  );
}

export function User(name, onPersonButtonPressCallback, profilePictureUrl) {
  console.log(profilePictureUrl);
  return (
    <UserSpace>
      <UserName>
        {profilePictureUrl
          ? ProfilePicture(onPersonButtonPressCallback, profilePictureUrl)
          : PersonOutlineButton(onPersonButtonPressCallback)}
        <Text>{name}</Text>
      </UserName>
    </UserSpace>
  );
}
