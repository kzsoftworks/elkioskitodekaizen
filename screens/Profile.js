import { get } from "lodash";
import React from "react";
import { ScrollView, View } from "react-native";
import { observer } from "mobx-react";
import styled from "styled-components/native";
import { Text } from "react-native-ui-kitten";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Container from "../components/Container";
import PurchasesList from "../components/PurchasesList";
import authState from "../states/authState";
import { PersonOutlineButton } from "../components/RoundButton";
import { navigateToScreen } from "../scripts/navigation";
import { ArrowBackButton } from "../components/RoundButton";

export default observer(function Profile({ navigation }) {
  return (
    <Container>
      <User>
        <UserName>
          {PersonOutlineButton(() => {})}
          <Text>{get(authState, "user.name", "")}</Text>
        </UserName>
      </User>
      <View
        style={{
          position: "absolute",
          top: getStatusBarHeight() + 25,
          left: 25,
        }}
      >
        {ArrowBackButton(() => navigateToScreen(navigation, "Home"))}
      </View>
      <Container>
        <ScrollView>
          <PurchasesList />
        </ScrollView>
      </Container>
    </Container>
  );
});

const User = styled.View`
  padding-vertical: 60px;
  justify-content: center;
  align-items: center;
`;
const UserName = styled.View`
  margin-bottom: 15px;
`;
