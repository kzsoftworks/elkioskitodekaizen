import React from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import styled from "styled-components/native";
import Container from "../components/Container";
import authState from "../states/authState";
import { logout } from "../scripts/auth";
import { Button, Text } from "react-native-ui-kitten";
import { PersonOutlineButton } from "../components/RoundButton";
import { navigateToScreen } from "../scripts/navigation";

export default observer(function Home({ navigation }) {
  return (
    <Container>
      <User>
        <UserName>
          {PersonOutlineButton(() => navigateToScreen(navigation, "Profile"))}
          <Text>{get(authState, "user.name", "")}</Text>
        </UserName>
      </User>
      <Button
        onPress={() => navigateToScreen(navigation, "ChooseProduct")}
        style={{
          marginTop: 7,
          marginBottom: 7,
        }}
      >
        Choose item from product list
      </Button>
      <Button
        onPress={() => navigateToScreen(navigation, "ProductScanner")}
        style={{
          marginTop: 7,
          marginBottom: 7,
        }}
      >
        Scan product code
      </Button>
      <Button
        onPress={() => navigateToScreen(navigation, "Profile")}
        style={{
          marginTop: 7,
          marginBottom: 7,
        }}
      >
        View this month purchases
      </Button>
      <Button
        onPress={() => logout(() => navigateToScreen(navigation, "SignIn"))}
        style={{
          marginTop: 7,
          marginBottom: 7,
        }}
      >
        Sign Out
      </Button>
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
