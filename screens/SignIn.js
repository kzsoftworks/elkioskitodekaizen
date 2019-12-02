import React, { useEffect, useState, useCallback } from "react";
import { Button } from "react-native-ui-kitten";
import { getFirestore } from "../firebaseHelpers";
import Container from "../components/Container";
import { login } from "../scripts/auth";
import { navigateToScreen } from "../scripts/navigation";

export default function SignIn({ navigation }) {
  const [dbh, setDbh] = useState(null);

  const signInCallback = useCallback(
    () => login(dbh, () => navigateToScreen(navigation, "Home")),
    [dbh, navigation]
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
      <Button
        onPress={() => login(dbh, () => navigateToScreen(navigation, "Home"))}
      >
        Sign In
      </Button>
    </Container>
  );
}
