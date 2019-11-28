import React, { useEffect, useState, useCallback } from "react";
import { NavigationActions } from "react-navigation";
import { Button } from "react-native-ui-kitten";
import { getFirestore } from "../firebaseHelpers";
import Container from "../components/Container";
import { login } from "../scripts/auth";

export default function SignIn({ navigation }) {
  const [dbh, setDbh] = useState(null);

  const navigateToProductScanner = useCallback(
    function() {
      navigation.reset(
        [NavigationActions.navigate({ routeName: "ProductScanner" })],
        0
      );
    },
    [navigation]
  );

  const signInCallback = useCallback(
    () => login(dbh, navigateToProductScanner),
    [dbh, navigateToProductScanner]
  );

  useEffect(() => {
    setDbh(getFirestore());
  }, []);

  useEffect(() => {
    if (dbh) {
      signInCallback();
    }
  }, [dbh, signInCallback]);

  return (
    <Container>
      <Button onPress={() => login(dbh, navigateToProductScanner)}>
        Sign In
      </Button>
    </Container>
  );
}
