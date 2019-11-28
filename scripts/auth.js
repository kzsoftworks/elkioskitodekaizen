import { AsyncStorage } from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import authState from "../states/authState";
import authConfig from "../authConfig";

export function login(dbh, callback) {
  try {
    loginAsync(dbh, callback);
  } catch (err) {
    authState.clear();
    AsyncStorage.setItem("@KzKiosko:accessToken", JSON.stringify(null));
    AsyncStorage.setItem("@KzKiosko:user", JSON.stringify(null));
    console.log(err);
  }
}

export async function loginAsync(dbh, callback) {
  const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      authState.user = JSON.parse(await AsyncStorage.getItem("@KzKiosko:user"));
      authState.accessToken = JSON.parse(
        await AsyncStorage.getItem("@KzKiosko:accessToken")
      );
      if (authState.user) {
        const firebaseId = await getUserFirebaseId(dbh, authState.user);
        authState.user.firebaseId = firebaseId;
      }
    } else {
      const { type, accessToken, idToken, user } = await Google.logInAsync(
        authConfig
      );
      if (type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
        await firebase.auth().signInWithCredential(credential);
        AsyncStorage.setItem(
          "@KzKiosko:accessToken",
          JSON.stringify(accessToken)
        );
        AsyncStorage.setItem("@KzKiosko:user", JSON.stringify(user));
        authState.accessToken = accessToken;
        authState.user = user;
        const firebaseId = await getUserFirebaseId(dbh, user);
        authState.user.firebaseId = firebaseId;
      } else {
        throw new Error("User Cancelled Login");
      }
    }
    callback();
    unsubscribe();
  });
  return null;
}

export async function getUserFirebaseId(dbh, user) {
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

export async function logout(callback) {
  await Google.logOutAsync({
    accessToken: authState.accessToken,
    ...authConfig,
  });
  firebase.auth().signOut();
  callback();
}
