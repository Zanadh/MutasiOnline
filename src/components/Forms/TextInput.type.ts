import type {
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  KeyboardTypeOptions,
} from "react-native";

export interface TextInputPropsInterface {
  placeholder?: string;
  value?: string;
  style?: StyleProp<TextStyle>;
  onChangeText?: (value: string) => void;
  handleBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  keyboardType?: KeyboardTypeOptions;
  prefixIcon?: string;
  prefixIconColor?: string;
  secureTextEntry?: boolean;
  textStyle?: StyleProp<TextStyle>;
  errorMessage?: string;
}
