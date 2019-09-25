import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import styled from "styled-components/native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Icon, Button } from "react-native-ui-kitten";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { getFirestore } from "../firebaseHelpers";
import authState from "../states/authState";
import Container from "../components/Container";

export default function ProductScanner({ navigation }) {
  const [dbh, setDbh] = useState(null);
  const [hasScanned, setHasScanned] = useState(false);

  useEffect(() => {
    setDbh(getFirestore());
    getPermissionsAsync();
  }, []);

  return (
    <Container>
      <Camera
        ratio="16:9"
        onBarCodeScanned={hasScanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <ProfileButton
        onPress={() => navigation.navigate("Profile")}
        icon={() => <Icon fill="white" name="person-outline" />}
      />
    </Container>
  );

  async function getPermissionsAsync() {
    await Permissions.askAsync(Permissions.CAMERA);
  }

  async function handleBarCodeScanned({ data }) {
    setHasScanned(true);
    const itemsRef = await dbh
      .collection("items")
      .where("bar_code", "==", data)
      .limit(1)
      .get();
    if (itemsRef.empty) {
      Alert.alert("Item doesn't exst", "Please contact the Office Manager.", [
        {
          text: "Ok",
          onPress: () => {
            setHasScanned(false);
          },
        },
      ]);
    } else {
      const itemDoc = itemsRef.docs[0];
      const itemData = itemDoc.data();
      Alert.alert(
        "Confirm purchase ",
        `Are you sure you want to buy ${itemData.name}?`,
        [
          {
            text: "Yes",
            onPress: async () => {
              await dbh.collection("purchases").add({
                cost: itemData.price,
                date: new Date(),
                user_id: authState.user.firebaseId,
                item_id: itemDoc.ref.id,
              });
              Alert.alert("Sabelo!", `You purchased: ${itemData.name}`, [
                {
                  text: "Vapai",
                  onPress: () => {
                    setHasScanned(false);
                  },
                },
              ]);
              setHasScanned(false);
            },
          },
          {
            text: "No",
            onPress: () => setHasScanned(false),
            style: "cancel",
          },
        ]
      );
    }
  }
}

const ProfileButton = styled(Button)`
  position: absolute;
  top: ${getStatusBarHeight() + 25}px;
  right: 25px;
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;
