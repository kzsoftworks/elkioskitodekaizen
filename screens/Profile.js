import { get } from "lodash";
import React from "react";
import { ScrollView, View } from "react-native";
import { observer } from "mobx-react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Container from "../components/Container";
import PurchasesList from "../components/PurchasesList";
import authState from "../states/authState";
import { navigateToScreen } from "../scripts/navigation";
import { ArrowBackButton } from "../components/RoundButton";
import { User } from "../components/User";

export default observer(function Profile({ navigation }) {
  return (
    <Container>
      {User(
        get(authState, "user.name", ""),
        () => {},
        get(authState, "user.photoUrl", "")
      )}
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
