import type { TextStyle, ViewProps } from "react-native";

export interface ButtonPropsInterface {
  onPress?: () => void;
  label?: string;
  style?: ViewProps;
  textStyle?: TextStyle;
}
