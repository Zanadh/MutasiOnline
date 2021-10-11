import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

import { Card } from "../components/Card";
import HeaderBackground from "../components/HeaderBackground";
import { BaseLayout } from "../components/Layout";
import type { BaseStackParamList } from "../navigator";
import type { AuthStackParamList } from "../navigator/AuthenticationStack";
import { ColorBaseEnum } from "../styles/Colors";

import { AuthStackNavigationProp } from "./LandingScreen";

const HomeHeader = () => {
  return (
    <View style={styles.homeHeader}>
      <HeaderBackground style={{ height: 100 }} />
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          padding: 16,
        }}>
        <Text style={[styles.titleText, { color: ColorBaseEnum.white }]}>
          Info
        </Text>
        <Card
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}>
          <Image
            source={require("../assets/Images/SATILANTAS.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
            }}
          />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text
              style={{
                color: ColorBaseEnum.black,
                fontWeight: "700",
                fontSize: 16,
              }}>
              Informasi Dari Admin Lantas
            </Text>
            <Text style={{ fontSize: 13, marginTop: 4 }}>
              Berisikan Update Informasi Terbaru
            </Text>
          </View>
        </Card>
      </View>
    </View>
  );
};

type NotificationScreenNavigationProp = StackNavigationProp<
  BaseStackParamList,
  "Progress"
>;

const InfoScreen = () => {
  const navigation = useNavigation<NotificationScreenNavigationProp>();
  return (
    <BaseLayout style={{ paddingHorizontal: 0, paddingTop: 0 }}>
      <HomeHeader />
      <View style={styles.contentContainer} />
      <View style={{ height: 60 }} />
    </BaseLayout>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  homeHeader: {
    height: 160,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 22,
    color: ColorBaseEnum.black,
    fontWeight: "bold",
  },
});
