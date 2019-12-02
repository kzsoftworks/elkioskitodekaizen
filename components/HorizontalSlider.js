import React from "react";
import { Slider } from "react-native";

export default function HorizontalSlider(initialValue, onValueChangeCallback) {
  return (
    <Slider
      style={{ width: "80%", height: 50 }}
      value={initialValue}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
      onValueChange={onValueChangeCallback}
    />
  );
}
