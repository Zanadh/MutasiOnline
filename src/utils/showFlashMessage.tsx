import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { showMessage } from "react-native-flash-message";
import {
  ColorBaseEnum,
  ColorSemanticDangerEnum,
  ColorSemanticInfoEnum,
  ColorSemanticPositiveEnum,
  ColorSemanticWarningEnum,
} from "styles/Colors";

export type FlashMessageType = "danger" | "success" | "warning" | "info";

export const showFlashMessage = ({
  type,
  message,
}: {
  type: FlashMessageType;
  message: string;
}) => {
  const iconName = {
    info: "info-circle",
    danger: "exclamation-circle",
    warning: "exclamation-circle",
    success: "check-circle",
  };

  const backgroundColor = {
    info: ColorSemanticInfoEnum.dark,
    danger: ColorSemanticDangerEnum.default,
    warning: ColorSemanticWarningEnum.default,
    success: ColorSemanticPositiveEnum.default,
  };

  showMessage({
    message,
    backgroundColor: backgroundColor[type],
    renderFlashMessageIcon: () => (
      <Icon name={iconName[type]} color={ColorBaseEnum.white} />
    ),
  });
};
