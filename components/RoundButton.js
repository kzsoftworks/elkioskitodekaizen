import React from "react";
import styled from "styled-components/native";
import { Icon, Button } from "react-native-ui-kitten";

export const RoundButton = styled(Button)`
  margin-left: 10px;
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;

export function PersonOutlineButton(onPressCallback) {
  return (
    <RoundButton
      onPress={onPressCallback}
      icon={() => <Icon fill="white" name="person-outline" />}
    />
  );
}

export function FlashOutlineButton(onPressCallback) {
  return (
    <RoundButton
      onPress={onPressCallback}
      icon={() => <Icon fill="white" name="flash-outline" />}
    />
  );
}

export function FlashOffOutlineButton(onPressCallback) {
  return (
    <RoundButton
      onPress={onPressCallback}
      icon={() => <Icon fill="white" name="flash-off-outline" />}
    />
  );
}

export function MoreHorizontalOutlineButton(onPressCallback) {
  return (
    <RoundButton
      onPress={onPressCallback}
      icon={() => <Icon fill="white" name="more-horizontal-outline" />}
    />
  );
}

export function MaximizeOutlineButton(onPressCallback) {
  return (
    <RoundButton
      onPress={onPressCallback}
      icon={() => <Icon fill="white" name="maximize-outline" />}
    />
  );
}

export function PlusSquareOutlineButton(onPressCallback) {
  return (
    <RoundButton
      onPress={onPressCallback}
      icon={() => <Icon fill="white" name="plus-square-outline" />}
    />
  );
}

export function ArrowBackButton(onPressCallback) {
  return (
    <RoundButton
      onPress={onPressCallback}
      icon={() => <Icon fill="white" name="arrow-back-outline" />}
    />
  );
}
