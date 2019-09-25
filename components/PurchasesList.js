import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import FirebaseState from "../states/firebaseState";
import { observer } from "mobx-react";
import Container from "../components/Container";
import { List, ListItem } from "react-native-ui-kitten";

function PurchasesList() {
  const [purchasedItems, setPurchasedItems] = useState(null);
  useEffect(() => {
    FirebaseState.getMonthPurchases()
      .then(v => setPurchasedItems(v))
      .catch(console.log);
  }, []);

  return purchasedItems ? (
    <Container>
      <List
        data={purchasedItems}
        renderItem={({ item }) => {
          return (
            <ListItem
              title={item.item ? item.item.name : "null"}
              titleStyle={{
                backgroundColor: "#9c5cbf",
                color: "white",
                textAlign: "center",
                padding: 20,
                borderRadius: 10,
              }}
              description={
                item.item &&
                `${item.item.price} - ${new Date(
                  item.date.seconds
                ).getDate()}/${new Date(item.date.seconds).getMonth()}`
              }
            />
          );
        }}
      />
    </Container>
  ) : (
    <ActivityIndicator size="large" />
  );
}

export default observer(PurchasesList);
