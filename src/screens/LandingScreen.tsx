import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
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
import { ScrollView } from "react-native-gesture-handler";

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
}

const slideContents: Array<slideInterface> = [
  {
    title: "Mutasi Online",
    subTitle:
      "Selamat Datang Di Aplikasi Mutasi Kendaraan Online DITLANTAS Daerah Maluku Utara",
    bgSource: require("../assets/Images/landingBg1.jpg"),
    imgSource: require("../assets/Images/SATILANTAS.jpg"),
  },
  {
    title: "",
    subTitle: "",
    bgSource: require("../assets/Images/landingBg1.jpg"),
    imgSource: require("../assets/Images/SATILANTAS.jpg"),
  },
  {
    title: "",
    subTitle: "",
    bgSource: require("../assets/Images/landingBg1.jpg"),
    imgSource: require("../assets/Images/SATILANTAS.jpg"),
  },
];

const Slide = ({ title, subTitle, imgSource }: slideInterface) => {
  return (
    <View style={[styles.imageBg, { padding: 24 }]}>
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
        <Text style={{ color: ColorSemanticInfoEnum.default }}>DITLANTAS</Text>
        <Text style={styles.subTitleText}>{subTitle}</Text>
      </View>
    </View>
  );
};

const LandingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  console.log(currentIndex);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      setCurrentIndex((viewableItems[0] && viewableItems[0].index) || 0);
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
