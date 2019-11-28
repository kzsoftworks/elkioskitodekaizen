import React from "react";
import { Slider } from "react-native";

export default function HorizontalSlider(onValueChangeCallback) {
  return (
    <Slider
      style={{ width: 250 }}
      minimumValue={0}
      maximumValue={1}
      //   minimumTrackTintColor="#FFFFFF"
      //   maximumTrackTintColor="#000000"
      onValueChange={onValueChangeCallback}
    />
  );
}
