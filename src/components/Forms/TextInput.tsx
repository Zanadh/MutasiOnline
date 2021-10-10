import React, { useRef, useState } from "react";
import { StyleSheet, View, TextInput as RNTextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { ColorBaseEnum } from "../../styles/Colors";

import type { TextInputPropsInterface } from "./TextInput.type";

const TextInput = (props: TextInputPropsInterface) => {
  const [isFocus, setIsFocus] = useState(false);
  const textRef = useRef(null);
  return (
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
            color={"black"}
            style={{ marginRight: 4 }}
          />
        </View>
      )}
      <RNTextInput
        ref={textRef}
        {...props}
        style={{ height: 45, flex: 1 }}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    marginBottom: 4,
  },
});
