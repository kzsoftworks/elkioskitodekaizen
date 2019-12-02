import React from "react";
import { ScrollView, View } from "react-native";
import { observer } from "mobx-react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Container from "../components/Container";
import ProductsList from "../components/ProductsList";
import { navigateToScreen } from "../scripts/navigation";
import { ArrowBackButton } from "../components/RoundButton";

function ChooseProduct({ navigation }) {
  return (
    <Container>
      <View style={{ paddingTop: 45 }} />
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
          <ProductsList />
        </ScrollView>
      </Container>
    </Container>
  );
}

export default observer(ChooseProduct);
