import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import type { ImageSourcePropType } from "react-native";
import {
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";
import LinearGradient from "react-native-linear-gradient";

import Avatar from "../components/Avatar";
import HeaderBackground from "../components/HeaderBackground";
import type { AuthStackParamList } from "../navigator/AuthenticationStack";
import { ColorBaseEnum, ColorSemanticInfoEnum } from "../styles/Colors";
import { Card } from "../components/Card";

const WIDTH = Dimensions.get("screen").width;
interface slideInterface {
  title: string;
  subTitle: string;
  bgSource: ImageSourcePropType;
}
const slideContents: Array<slideInterface> = [
  {
    title: "Mutasi Online",
    subTitle:
      "Layanan Aplikasi Mutasi Kendaraan online untuk Daerah Maluku Utara",
    bgSource: require("../assets/Images/polantasLogo.png"),
  },
  {
    title: "Pelayanan Mutasi",
    subTitle:
      "Pelayanan Mutasi pindah alamat,  balk nama, ganti warna, rubah bentuk, dan ganti noipol secara online",
    bgSource: require("../assets/Images/homeBanner3.jpg"),
  },
  {
    title: "Layanan Maksimal",
    subTitle:
      "Aplikasi dengan tampilan yang menarik dan fitur yang memudahkan masyarakat",
    bgSource: require("../assets/Images/homeBanner2.jpg"),
  },
];

type requestType =
  | "addressChange"
  | "nameTransfer"
  | "colorChange"
  | "shapeChange"
  | "numberPlateChange"
  | "comingSoon";

const cardItems: Array<{
  requestType: requestType;
  title: string;
  desc: string;
  imgSource: ImageSourcePropType;
}> = [
  {
    requestType: "addressChange",
    title: "Pindah Alamat",
    desc: "Mutasi Kendaraan untuk Pindah Alamat",
    imgSource: require("../assets/Images/map.png"),
  },
  {
    requestType: "nameTransfer",
    title: "Balik Nama",
    desc: "Mutasi Kendaraan untuk Balik Nama",
    imgSource: require("../assets/Images/nameTransfer.png"),
  },
  {
    requestType: "colorChange",
    title: "Ganti Warna",
    desc: "Mutasi Kendaraan untuk Ganti Warna",
    imgSource: require("../assets/Images/colorChange.png"),
  },
  {
    requestType: "shapeChange",
    title: "Rubah Bentuk",
    desc: "Mutasi Kendaraan untuk Rubah Bentuk",
    imgSource: require("../assets/Images/shapeChange.png"),
  },
  {
    requestType: "numberPlateChange",
    title: "Nomor Polisi",
    desc: "Mutasi Kendaraan untuk Ganti Nomor Polisi",
    imgSource: require("../assets/Images/numberPlate.png"),
  },
  {
    requestType: "comingSoon",
    title: "Layanan Lainnya",
    desc: "Akan Datang Layanan Terbaru dari DITLANTAS",
    imgSource: require("../assets/Images/coming.jpg"),
  },
];

const renderItem = ({ item }: { item: slideInterface; index: number }) => {
  const { title, subTitle, bgSource } = item;
  return (
    <View
      style={[
        styles.slideItem,
        {
          backgroundColor: ColorBaseEnum.white,
          borderRadius: 25,
          overflow: "hidden",
          elevation: 5,
        },
      ]}>
      <ImageBackground
        source={bgSource || require("../assets/Images/landingBg1.jpg")}
        style={[styles.slideItem]}>
        <LinearGradient
          style={{
            flex: 1,
            width: WIDTH * 0.9,
            justifyContent: "flex-end",
            padding: 24,
          }}
          colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.subTitleText}>{subTitle}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const HomeHeader = () => {
  return (
    <View style={styles.homeHeader}>
      <HeaderBackground />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16,
        }}>
        <View>
          <Text style={[styles.titleText, { color: ColorBaseEnum.white }]}>
            Selamat Siang,
          </Text>
          <Text style={[styles.titleText, { color: ColorBaseEnum.white }]}>
            Rahman
          </Text>
        </View>
        <Avatar />
      </View>
      <Carousel
        data={slideContents}
        renderItem={renderItem}
        sliderWidth={WIDTH}
        itemWidth={WIDTH * 0.8}
        activeAnimationType="spring"
        loop
        loopClonesPerSide={3}
      />
    </View>
  );
};

type AuthStackNavigationProp = NavigationProp<AuthStackParamList, "Login">;
const HomeScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  return (
    <ScrollView>
      <HomeHeader />
      <View style={styles.contentContainer}>
        <Card>
          <Text
            style={{
              color: ColorBaseEnum.black,
              fontWeight: "700",
              fontSize: 16,
            }}>
            Layanan Mutasi Online
          </Text>
          <Text style={{ fontSize: 13, marginTop: 4 }}>
            Silahkan memilih salah satu layanan mutasi kendaraan online.
          </Text>
        </Card>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
          {cardItems.map(cardItem => {
            return (
              <Card
                style={{
                  width: WIDTH * 0.43,
                  alignSelf: "center",
                  marginBottom: 12,
                }}>
                <Image
                  source={cardItem.imgSource}
                  style={{ height: 80, width: "100%", marginVertical: 8 }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: ColorBaseEnum.black,
                    fontWeight: "700",
                    fontSize: 16,
                    textAlign: "center",
                  }}>
                  {cardItem.title}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    marginTop: 4,
                    textAlign: "center",
                    color: ColorSemanticInfoEnum.default,
                  }}>
                  {cardItem.desc}
                </Text>
              </Card>
            );
          })}
        </View>
      </View>
      <View style={{ height: 60 }} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeHeader: {
    height: 400,
    marginBottom: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  slideItem: {
    width: WIDTH * 0.8,
    height: 300,
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
    fontSize: 22,
    color: ColorBaseEnum.black,
    fontWeight: "bold",
  },
  subTitleText: {
    fontSize: 12,
    color: ColorBaseEnum.black,
    marginTop: 16,
    textAlign: "center",
  },
});
