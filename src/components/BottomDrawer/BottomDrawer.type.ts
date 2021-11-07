import type BottomSheet from "@gorhom/bottom-sheet";
import type { Ref } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type Animated from "react-native-reanimated";

export interface BottomDrawerProps {
  sheetRef: Ref<BottomSheet>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  bottomSheetStyle?: StyleProp<
    Animated.AnimateStyle<
      Omit<
        ViewStyle,
        | "opacity"
        | "bottom"
        | "flexDirection"
        | "left"
        | "position"
        | "right"
        | "top"
        | "transform"
      >
    >
  >;
  snapPoints?: Array<string | number>;
  isScrollable?: boolean;
}
