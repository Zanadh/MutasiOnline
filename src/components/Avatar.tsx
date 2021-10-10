import React from "react";
import { Image, View } from "react-native";

import { ColorBaseEnum, ColorBaseGrayEnum } from "../styles/Colors";

interface AvatarPropsInterface {
  url?: string;
  onPress?: () => void;
}

function Avatar({ url }: AvatarPropsInterface) {
  return (
    <View
      style={{
        borderRadius: 50,
        overflow: "hidden",
        height: 35,
        width: 35,
        borderWidth: 1,
        borderColor: ColorBaseGrayEnum.gray400,
        backgroundColor: ColorBaseEnum.white,
      }}>
      <Image
        source={url || require("../assets/Images/user.png")}
        style={{ height: 35, width: 35 }}
        resizeMode="contain"
      />
    </View>
  );
}

export default Avatar;
