import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

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
  date = date || "Unknown purchase date";
  return `${name}\n${cost}\n${date}`;
}

export function toPurchasedItem(item) {
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
  return PurchasedItem(result.name, result.cost, result.date);
}

export function PurchasedItem(name, cost, date) {
  return (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.description}>{formatText(name, cost, date)}</Text>
    </TouchableOpacity>
  );
}
