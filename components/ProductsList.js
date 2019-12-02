import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import FirebaseState from "../states/firebaseState";
import { observer } from "mobx-react";
import Constants from "expo-constants";
import { toProductItem } from "./ProductItem";
import Container from "./Container";
import { getFirestore } from "../firebaseHelpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

function ProductsList() {
  const [availableItems, setAvailableItems] = useState(null);
  const [errorWhileQuerying, setErrorWhileQuerying] = useState(null);
  const [dbh, setDbh] = useState(null);

  useEffect(() => {
    setDbh(getFirestore());
    FirebaseState.getAllItems()
      .then(v => setAvailableItems(v))
      .catch(e => setErrorWhileQuerying(e || "Unknown error"));
  }, []);

  if (errorWhileQuerying) {
    return (
      <Text>{`An error occurred while retrieving the products.\n${errorWhileQuerying}`}</Text>
    );
  } else if (availableItems) {
    return (
      <Container style={styles.container}>
        <FlatList
          data={availableItems}
          keyExtractor={item => item.bar_code}
          renderItem={item => {
            return item && item.item ? toProductItem(item.item, dbh) : {};
          }}
          ListEmptyComponent={<Text>There are no available items.</Text>}
        />
      </Container>
    );
  } else if (availableItems === null || availableItems === undefined) {
    return <ActivityIndicator size="large" />;
  } else {
    return <Text>There are no available items.</Text>;
  }
}

export default observer(ProductsList);
