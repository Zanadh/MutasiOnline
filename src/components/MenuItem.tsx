import React, { memo } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ColorBaseGrayEnum } from "styles/Colors";

export interface MenuItemInterface {
  title: string;
  icon?: {
    name: string;
    color: string;
  };
  onPress?: () => void;
}

const MenuItem = (props: MenuItemInterface) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      flexDirection: "row",
      display: "flex",
      alignItems: "center",
      paddingRight: 4,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderColor: ColorBaseGrayEnum.gray300,
    }}>
    {props.icon && (
      <View
        style={{
          width: 25,
          height: 25,
          backgroundColor: props.icon.color,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Icon name={props.icon.name} color="white" />
      </View>
    )}
    <View style={{ flex: 1, marginLeft: 10 }}>
      <Text
        style={{
          color: ColorBaseGrayEnum.gray700,
          fontSize: 15,
          fontWeight: "600",
        }}>
        {props.title}
      </Text>
    </View>
    <Icon name="chevron-right" color={ColorBaseGrayEnum.gray400} />
  </TouchableOpacity>
);

export default memo(MenuItem);
