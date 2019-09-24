import React from "react";
import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import * as Google from "expo-google-app-auth";
import { Button } from "react-native-ui-kitten";
import * as firebase from "firebase";
import authState from "../states/authState";
import Container from "../components/Container";
import authConfig from "../authConfig";
import initializeFirebase from "../initializeFirebase";
import "@firebase/firestore";

export default function SignIn({ navigation }) {
  const dbh = initializeFirebase();
  signIn();

  return (
    <Container>
      <Button onPress={signIn}>Sign In</Button>
    </Container>
  );

  function signIn() {
    signInAsync().catch(err => {
      authState.clear();
      AsyncStorage.setItem("@KzKiosko:accessToken", JSON.stringify(null));
      AsyncStorage.setItem("@KzKiosko:user", JSON.stringify(null));
      console.log(err);
    });
  }

  async function signInAsync() {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        authState.user = JSON.parse(
          await AsyncStorage.getItem("@KzKiosko:user")
        );
        authState.accessToken = JSON.parse(
          await AsyncStorage.getItem("@KzKiosko:accessToken")
        );
        if (authState.user) {
          const firebaseId = await getUserFirebaseId(authState.user);
          authState.user.firebaseId = firebaseId;
        }
      } else {
        const { type, accessToken, idToken, user } = await Google.logInAsync(
          authConfig
        );
        if (type === "success") {
          const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken
          );
          await firebase.auth().signInWithCredential(credential);
          AsyncStorage.setItem(
            "@KzKiosko:accessToken",
            JSON.stringify(accessToken)
          );
          AsyncStorage.setItem("@KzKiosko:user", JSON.stringify(user));
          authState.accessToken = accessToken;
          authState.user = user;
          const firebaseId = await getUserFirebaseId(user);
          authState.user.firebaseId = firebaseId;
        } else {
          throw new Error("User Cancelled Login");
        }
      }
      navigateToProductScanner();
      unsubscribe();
    });
    return null;
  }

  async function getUserFirebaseId(user) {
    const query = await dbh
      .collection("users")
      .where("auth_id", "==", user.id)
      .limit(1)
      .get();

    if (query.empty) {
      const docRef = await dbh.collection("users").add({
        auth_id: user.id,
        name: user.name,
      });
      return docRef.id;
    } else {
      return query.docs[0].id;
    }
  }

  function navigateToProductScanner() {
    navigation.reset(
      [NavigationActions.navigate({ routeName: "ProductScanner" })],
      0
    );
  }
}
