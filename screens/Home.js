import React from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import Container from "../components/Container";
import authState from "../states/authState";
import { logout } from "../scripts/auth";
import { Button } from "react-native-ui-kitten";
import { navigateToScreen } from "../scripts/navigation";
import { User } from "../components/User";

export default observer(function Home({ navigation }) {
  return (
    <Container>
      {User(
        get(authState, "user.name", ""),
        () => navigateToScreen(navigation, "Profile"),
        get(authState, "user.photoUrl", "")
      )}
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
