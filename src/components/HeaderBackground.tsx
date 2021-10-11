import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { View, StyleSheet, ImageBackground } from "react-native";

import { ColorPrimaryEnum } from "../styles/Colors";

function HeaderBackground({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: ColorPrimaryEnum.secondary,
          height: 150,
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
          overflow: "hidden",
        },
        style,
      ]}>
      <ImageBackground
        source={require("../assets/Images/landingBg1.jpg")}
        style={{ width: "100%", height: "100%", opacity: 0.3 }}
      />
    </View>
  );
}

export default HeaderBackground;
