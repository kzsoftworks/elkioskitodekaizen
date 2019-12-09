import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native-ui-kitten";
import { PersonOutlineButton } from "../components/RoundButton";

export const UserSpace = styled.View`
  padding-vertical: 60px;
  justify-content: center;
  align-items: center;
`;
export const UserName = styled.View`
  margin-bottom: 15px;
`;

export function User(name, onPersonButtonPressCallback) {
  return (
    <UserSpace>
      <UserName>
        {PersonOutlineButton(onPersonButtonPressCallback)}
        <Text>{name}</Text>
      </UserName>
    </UserSpace>
  );
}
