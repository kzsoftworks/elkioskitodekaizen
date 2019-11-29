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

function formatText(name, cost) {
  name = name || "Unknown product";
  cost = cost === 0 ? cost : cost || "Unknown cost";
  cost = cost === "Unknown cost" ? cost : `$${cost}`;
  return `${name}\n${cost}`;
}

export function toProductItem(item) {
  return ProductItem(item.bar_code, item.name, item.price);
}

export function ProductItem(barcode, name, cost) {
  this.barcode = barcode;

  return (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.description}>{formatText(name, cost)}</Text>
    </TouchableOpacity>
  );
}
