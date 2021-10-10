import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

import { ColorPrimaryEnum } from "../styles/Colors";

function HeaderBackground() {
  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: ColorPrimaryEnum.secondary,
          height: 150,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          overflow: "hidden",
        },
      ]}>
      <ImageBackground
        source={require("../assets/Images/landingBg1.jpg")}
        style={{ width: "100%", height: "100%", opacity: 0.3 }}
      />
    </View>
  );
}

export default HeaderBackground;
