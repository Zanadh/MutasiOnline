import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import type { ImageSourcePropType, ViewToken } from "react-native";
import {
  Animated,
  FlatList,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";

import { Button } from "../components/Button";
import Paginator from "../components/Paginator";
import type { AuthStackParamList } from "../navigator/AuthenticationStack";
import { ColorBaseEnum, ColorSemanticInfoEnum } from "../styles/Colors";

export type AuthStackNavigationProp = NavigationProp<
  AuthStackParamList,
  "Landing"
>;

const WIDTH = Dimensions.get("screen").width;

interface slideInterface {
  title: string;
  subTitle: string;
  bgSource: ImageSourcePropType;
  imgSource: ImageSourcePropType;
  btnText: string;
}

const slideContents: Array<slideInterface> = [
  {
    title: "Mutasi Online",
    subTitle:
      "Selamat Datang Di Aplikasi Mutasi Kendaraan Online DITLANTAS Daerah Maluku Utara",
    bgSource: require("../assets/Images/landingBg1.jpg"),
    imgSource: require("../assets/Images/SATILANTAS.jpg"),
    btnText: "",
  },
  {
    title: "Mudah & Cepat",
    subTitle:
      "Menyediakan Kemudahan Dalam Pelayanan Mutasi Kendaraan Secara Online Dengan Fitur Yang Terbaik",
    bgSource: require("../assets/Images/landingBg1.jpg"),
    imgSource: require("../assets/Images/SATILANTAS.jpg"),
    btnText: "",
  },
  {
    title: "Dimanapun & Kapanpun",
    subTitle:
      "Aplikasi Mutasi Kendaraan Online Dapat Digunakan Dimanapun & Kapanpun",
    bgSource: require("../assets/Images/landingBg1.jpg"),
    imgSource: require("../assets/Images/SATILANTAS.jpg"),
    btnText: "MULAI APLIKASI",
  },
];

const Slide = ({ title, subTitle, imgSource, btnText }: slideInterface) => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  const handlePressBtn = () => {
    navigation.navigate("Register");
  };

  return (
    <View
      style={[
        styles.imageBg,
        { padding: 24, display: "flex", justifyContent: "space-between" },
      ]}>
      <View style={{ alignItems: "center", marginTop: "30%" }}>
        <Image
          source={imgSource}
          style={{
            width: 150,
            height: 150,
            borderRadius: 25,
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={{ color: ColorSemanticInfoEnum.default }}>
            DITLANTAS
          </Text>
          <Text style={styles.subTitleText}>{subTitle}</Text>
        </View>
      </View>
      {!!btnText && (
        <Button
          label={btnText}
          onPress={handlePressBtn}
          textStyle={{ fontWeight: "600" }}
        />
      )}
    </View>
  );
};

const LandingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      setCurrentIndex(((viewableItems[0] && viewableItems[0].index) || 0) + 1);
    },
  ).current;

  return (
    <ImageBackground
      source={
        (slideContents[0] && slideContents[0].bgSource) ||
        require("../assets/Images/landingBg1.jpg")
      }
      imageStyle={{ opacity: 0.1 }}
      style={[styles.imageBg, { borderWidth: 1 }]}>
      <FlatList
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={slideContents}
        renderItem={({ item }) => <Slide {...item} />}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onScrollToIndexFailed={() => ref.current?.scrollToIndex({ index: 0 })}
        onViewableItemsChanged={viewableItemsChanged}
        ref={ref}
      />
      <Paginator dataLength={slideContents.length} scrollX={scrollX} />
    </ImageBackground>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  imageBg: {
    width: WIDTH,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  titleText: {
    fontSize: 32,
    color: ColorBaseEnum.black,
    fontWeight: "bold",
  },
  subTitleText: {
    fontSize: 14,
    color: ColorBaseEnum.black,
    marginTop: 16,
    textAlign: "center",
  },
});
