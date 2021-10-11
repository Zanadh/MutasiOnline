import React from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import { View } from "react-native";

import { ColorBaseEnum } from "../../styles/Colors";

interface CardPropsInterface {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const Card: React.FC<CardPropsInterface> = ({ children, style }) => {
  return (
    <View
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
    </View>
  );
};

export default Card;
