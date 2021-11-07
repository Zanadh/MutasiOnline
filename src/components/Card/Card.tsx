import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity, ViewProps, View } from "react-native";

import { ColorBaseEnum } from "../../styles/Colors";

interface CardPropsInterface {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  onPress?: () => void;
}

const Card: React.FC<CardPropsInterface> = ({ children, style, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[
        {
          backgroundColor: ColorBaseEnum.white,
          elevation: 4,
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 12,
          marginBottom: 8,
        },
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

export default Card;
