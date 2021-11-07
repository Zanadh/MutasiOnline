import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface ButtonPropsInterface {
  onPress?: () => void;
  disabled?: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  isLoading?: boolean;
}
