import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import {
  ColorBaseEnum,
  ColorBaseGrayEnum,
  ColorPrimaryEnum,
} from "../../styles/Colors";

import type { ButtonPropsInterface } from "./Button.type";

function Button(props: ButtonPropsInterface) {
  return (
    <TouchableOpacity
      onPress={props.disabled || props.isLoading ? undefined : props.onPress}>
      <View
        style={[
          styles.primary,
          props.disabled ? { backgroundColor: ColorBaseGrayEnum.gray400 } : {},
        ]}>
        {props.isLoading ? (
          <ActivityIndicator color={ColorBaseEnum.white} />
        ) : (
          <Text style={[styles.textStyle, props.textStyle]}>
            {props.label || ""}
          </Text>
        )}
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
