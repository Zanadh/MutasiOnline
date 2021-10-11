import type {
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

export interface TextInputPropsInterface {
  placeholder?: string;
  value?: string;
  style?: StyleProp<TextStyle>;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  prefixIcon?: string;
  prefixIconColor?: string;
  secureTextEntry?: boolean;
  textStyle?: StyleProp<TextStyle>;
}
