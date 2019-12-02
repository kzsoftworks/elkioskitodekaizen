import { Alert } from "react-native";
import authState from "../states/authState";

export default async function buyItemDialog(
  dbh,
  barcode,
  onSuccessfulPurchaseCallback,
  onCancelledPurchaseCallback,
  onItemNotFoundCallback,
  onErrorPurchasingCallback
) {
  const itemsRef = await dbh
    .collection("items")
    .where("bar_code", "==", barcode) //"7798228640018" es crowie sabor chocolate, por ejemplo
    .limit(1)
    .get();
  if (itemsRef.empty) {
    Alert.alert(
      "Item doesn't exist",
      "If you think this is an error, please contact the Office Manager.",
      [{ onPress: onItemNotFoundCallback }]
    );
  } else {
    const itemData = itemsRef.docs[0].data();
    showAskToBuyMessage(
      dbh,
      itemData,
      onSuccessfulPurchaseCallback,
      onCancelledPurchaseCallback,
      onErrorPurchasingCallback
    );
  }
}

function showAskToBuyMessage(
  dbh,
  itemData,
  onSuccessfulPurchaseCallback,
  onCancelledPurchaseCallback,
  onErrorPurchasingCallback
) {
  Alert.alert(
    "Confirm purchase",
    `Item: ${itemData.name}\nPrice: $${itemData.price}`,
    [
      {
        text: "Yes",
        onPress: async () => {
          try {
            await dbh.collection("purchases").add({
              user_id: authState.user.firebaseId,
              barcode: itemData.bar_code,
              name: itemData.name,
              cost: itemData.price,
              date: new Date(),
            });
            Alert.alert("Sabelo!", `You purchased: ${itemData.name}`, [
              { onPress: onSuccessfulPurchaseCallback },
            ]);
          } catch (e) {
            Alert.alert("An error has occurred", e.message, [
              { onPress: onErrorPurchasingCallback },
            ]);
          }
        },
      },
      {
        text: "No",
        onPress: onCancelledPurchaseCallback,
        style: "cancel",
      },
    ]
  );
}
