import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { getFirestore } from "../firebaseHelpers";
import buyItemDialog from "../scripts/userDialogs";

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#3f64f6",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  description: {
    fontSize: 14,
    color: "#ffffff",
  },
});

function formatText(name, cost, date) {
  name = name || "Unknown product";
  cost = cost === 0 ? cost : cost || "Unknown cost";
  cost = cost === "Unknown cost" ? cost : `$${cost}`;
  date =
    date && date instanceof Date
      ? date.toLocaleString("en-US", {
          era: "short",
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      : date;
  date = date || "Unknown purchase date";
  return `${name}\n${cost}\n${date}`;
}

export function toPurchasedItem(item, dbh, onPressCallback) {
  let result = {};
  result.cost = item.cost;
  result.date = item.date;
  if (item.name) {
    result.name = item.name;
  } else {
    result.name = item.barcode || item.item_barcode;
    if (result.name) {
      result.name = `Item ${result.name}`;
    }
  }
  return PurchasedItem(
    item.barcode,
    result.name,
    result.cost,
    result.date,
    dbh,
    onPressCallback
  );
}

export function PurchasedItem(barcode, name, cost, date, dbh, onPressCallback) {
  if (!onPressCallback) {
    dbh = dbh || getFirestore();
    onPressCallback = async () =>
      await buyItemDialog(
        dbh,
        barcode,
        () => {},
        () => {},
        () => {},
        () => {}
      );
  }

  return (
    <TouchableOpacity style={styles.item} onPress={onPressCallback}>
      <Text style={styles.description}>{formatText(name, cost, date)}</Text>
    </TouchableOpacity>
  );
}
