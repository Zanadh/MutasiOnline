import React, { useRef, useState } from "react";
import { StyleSheet, View, TextInput as RNTextInput, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  ColorBaseEnum,
  ColorBaseGrayEnum,
  ColorSemanticDangerEnum,
} from "../../styles/Colors";

import type { TextInputPropsInterface } from "./TextInput.type";

const TextInput = (props: TextInputPropsInterface) => {
  const [isFocus, setIsFocus] = useState(false);
  const textRef = useRef(null);
  return (
    <>
      <View
        style={[
          styles.textInput,
          {
            flexDirection: "row",
            alignItems: "center",
            borderColor: isFocus ? ColorBaseEnum.black : "#e0e0e0",
          },
          props.style,
        ]}>
        {!!props.prefixIcon && (
          <View style={{ width: 24, alignItems: "center" }}>
            <Icon
              name={props.prefixIcon}
              size={16}
              color={props.prefixIconColor || ColorBaseEnum.black}
              style={{ marginRight: 4 }}
            />
          </View>
        )}
        <RNTextInput
          ref={textRef}
          {...props}
          placeholderTextColor={ColorBaseGrayEnum.gray500}
          style={[
            { height: 45, flex: 1, color: ColorBaseEnum.black },
            props.textStyle,
          ]}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={e => {
            setIsFocus(false);
            props.handleBlur && props.handleBlur(e);
          }}
        />
      </View>

      {!!props.errorMessage && (
        <Text
          style={{
            color: ColorSemanticDangerEnum.default,
            fontSize: 12,
          }}>
          {props.errorMessage}
        </Text>
      )}
    </>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    marginBottom: 4,
  },
});
