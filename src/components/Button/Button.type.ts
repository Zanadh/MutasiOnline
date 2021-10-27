import type { TextStyle, ViewProps } from "react-native";

export interface ButtonPropsInterface {
  onPress?: () => void;
  disabled?: boolean;
  label?: string;
  style?: ViewProps;
  textStyle?: TextStyle;
  isLoading?: boolean;
}
