import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import FirebaseState from "../states/firebaseState";
import { observer } from "mobx-react";
import Container from "../components/Container";
import { List, ListItem } from "react-native-ui-kitten";
import { getMonth, getDate } from "date-fns";

function PurchasesList() {
  const [purchasedItems, setPurchasedItems] = useState(null);
  useEffect(() => {
    FirebaseState.getMonthPurchases()
      .then(v => setPurchasedItems(v))
      .catch(console.log);
  }, []);

  function log(e) {
    console.log(e);
    return true;
  }
  return purchasedItems ? (
    <Container>
      <List
        data={purchasedItems}
        renderItem={({ item }) => {
          return (
            log(item.date) && (
              <ListItem
                title={item.item ? item.item.name : "null"}
                titleStyle={{
                  textAlign: "center",
                }}
                description={
                  item.item &&
                  `${item.item.price} pei - ${getMonth(item.date)}/${getDate(
                    item.date
                  )}`
                }
              />
            )
          );
        }}
      />
    </Container>
  ) : (
    <ActivityIndicator size="large" />
  );
}

export default observer(PurchasesList);
