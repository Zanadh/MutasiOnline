import React, { memo, useMemo } from "react";
import type { FC } from "react";
import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { ColorBaseGrayEnum } from "styles/Colors";

import type { BottomDrawerProps } from "./BottomDrawer.type";

const BottomDrawer: FC<BottomDrawerProps> = props => {
  const initialSnapPoints = useMemo(
    () => props.snapPoints || ["CONTENT_HEIGHT"],
    [props.snapPoints],
  );
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  return (
    <BottomSheet
      ref={props.sheetRef}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      detached
      index={-1}
      enablePanDownToClose
      bottomInset={65}
      style={[styles.bottomSheet, props.bottomSheetStyle]}>
      <BottomSheetView
        onLayout={handleContentLayout}
        style={[styles.contentContainer, props.contentContainerStyle]}>
        {props.children}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomDrawer;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  bottomSheet: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: ColorBaseGrayEnum.gray400,
  },
});
