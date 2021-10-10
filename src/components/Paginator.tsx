import { Animated, StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Paginator = ({
  dataLength,
  scrollX,
}: {
  dataLength: number;
  scrollX: Animated.Value;
}) => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flexDirection: "row",
        height: 64,
        alignItems: "center",
      }}>
      {Array.from(Array(dataLength)).map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const bgColor = scrollX.interpolate({
          inputRange,
          outputRange: [
            "rgb(180, 180, 180)",
            "rgb(120, 120, 120)",
            "rgb(180, 180, 180)",
          ],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, backgroundColor: bgColor }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "grey",
    marginHorizontal: 5,
  },
});
