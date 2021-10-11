import React from "react";
import type { ScrollViewProps, StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { ColorBaseGrayEnum } from "../../styles/Colors";

const BaseLayout: React.FC<{
  noScroll?: boolean;
  scrollViewProps?: ScrollViewProps;
  style?: StyleProp<ViewStyle>;
}> = ({ noScroll, children, scrollViewProps, style }) => {
  if (noScroll) {
    return <View style={[styles.baseStyle, style]}>{children}</View>;
  }
  return (
    <ScrollView style={[styles.baseStyle, style]} {...(scrollViewProps || {})}>
      {children}
    </ScrollView>
  );
};

export default BaseLayout;

const styles = StyleSheet.create({
  baseStyle: {
    backgroundColor: ColorBaseGrayEnum.gray300,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
});
