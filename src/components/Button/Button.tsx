import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { ColorBaseEnum, ColorPrimaryEnum } from "../../styles/Colors";

import type { ButtonPropsInterface } from "./Button.type";

function Button(props: ButtonPropsInterface) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.primary}>
        <Text style={[styles.textStyle, props.textStyle]}>
          {props.label || ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  primary: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: ColorPrimaryEnum.secondary,
  },
  textStyle: {
    color: ColorBaseEnum.white,
    textAlign: "center",
  },
});
