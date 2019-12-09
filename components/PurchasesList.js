import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import FirebaseState from "../states/firebaseState";
import { observer } from "mobx-react";
import Container from "./Container";
import { toPurchasedItem } from "./PurchasedItem";
import Constants from "expo-constants";
import { getFirestore } from "../firebaseHelpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

function PurchasesList() {
  const [purchasedItems, setPurchasedItems] = useState(null);
  const [errorWhileQuerying, setErrorWhileQuerying] = useState(null);
  const [dbh, setDbh] = useState(null);

  useEffect(() => {
    setDbh(getFirestore());
    FirebaseState.getMonthPurchases()
      .then(v => setPurchasedItems(v))
      .catch(e => setErrorWhileQuerying(e || "Unknown error"));
  }, []);

  if (errorWhileQuerying) {
    return (
      <Text>{`An error occurred while retrieving your purchases.\n${errorWhileQuerying}`}</Text>
    );
  } else if (purchasedItems) {
    return (
      <Container style={styles.container}>
        <FlatList
          data={purchasedItems}
          keyExtractor={item => item.id}
          renderItem={item => {
            return item && item.item ? toPurchasedItem(item.item, dbh) : {};
          }}
          ListEmptyComponent={
            <Text>No items were bought in the relevant time period.</Text>
          }
        />
      </Container>
    );
  } else if (purchasedItems === null || purchasedItems === undefined) {
    return <ActivityIndicator size="large" />;
  } else {
    return <Text>No items were bought in the relevant time period.</Text>;
  }
}

export default observer(PurchasesList);
