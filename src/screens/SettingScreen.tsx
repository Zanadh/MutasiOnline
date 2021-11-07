import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { AuthContext } from "context/AuthContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Card } from "../components/Card";
import HeaderBackground from "../components/HeaderBackground";
import { BaseLayout } from "../components/Layout";
import type { BaseStackParamList } from "../navigator";
import { ColorBaseEnum, ColorBaseGrayEnum } from "../styles/Colors";

type NotificationScreenNavigationProp = StackNavigationProp<
  BaseStackParamList,
  "Settings"
>;

interface MenuItemInterface {
  title: string;
  desc?: string;
  icon: {
    name: string;
    color: string;
  };
  suffixComponent: React.ReactNode;
  onPress?: () => void;
}

const MenuItem = (props: MenuItemInterface) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingRight: 4,
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderColor: ColorBaseGrayEnum.gray500,
      }}>
      <View
        style={{
          width: 25,
          height: 25,
          backgroundColor: props.icon.color,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Icon name={props.icon.name} color="white" />
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text
          style={{
            color: ColorBaseGrayEnum.gray700,
            fontSize: 16,
            fontWeight: "500",
          }}>
          {props.title}
        </Text>
        {!!props.desc && (
          <Text style={{ color: ColorBaseGrayEnum.gray600, fontSize: 13 }}>
            {props.desc}
          </Text>
        )}
      </View>
      {props.suffixComponent}
    </TouchableOpacity>
  );
};

const SettingScreen = () => {
  const navigation = useNavigation<NotificationScreenNavigationProp>();
  const { signOut } = React.useContext(AuthContext);

  const menuItemList: Array<MenuItemInterface> = [
    {
      title: "Account",
      desc: "Pengaturan Akun Anda",
      icon: {
        name: "user",
        color: "blue",
      },
      suffixComponent: <Icon name="chevron-right" />,
    },
    {
      title: "Notification",
      desc: "Pengaturan Pemberitahuan",
      icon: {
        name: "bell",
        color: "red",
      },
      suffixComponent: <Icon name="toggle-off" />,
    },
    {
      title: "Privacy Policy",
      desc: "Pengaturan Kebijakan Pribadi",
      icon: {
        name: "key",
        color: "green",
      },
      suffixComponent: <Icon name="chevron-right" />,
    },
    {
      title: "Terms & Conditions",
      desc: " Pengaturan Syarat dan Ketentuan",
      icon: {
        name: "file-alt",
        color: "blue",
      },
      suffixComponent: <Icon name="chevron-right" />,
    },
    {
      title: "Help & Support",
      desc: "Pengaturan Bantuan & Dukungan",
      icon: {
        name: "headset",
        color: "purple",
      },
      suffixComponent: <Icon name="chevron-right" />,
    },
    {
      title: "About",
      desc: "Tentang Aplikasi",
      icon: {
        name: "question-circle",
        color: "purple",
      },
      suffixComponent: <Icon name="chevron-right" />,
    },
    {
      title: "Sign Out",
      icon: {
        name: "sign-out-alt",
        color: "red",
      },
      suffixComponent: <Icon name="chevron-right" />,
      onPress: signOut,
    },
  ];

  return (
    <BaseLayout style={{ paddingHorizontal: 0, paddingTop: 0 }}>
      <HeaderBackground style={{ height: 100 }} />
      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.titleText,
            { color: ColorBaseEnum.white, marginBottom: 12 },
          ]}>
          Settings
        </Text>
        <Card
          style={{
            display: "flex",
            paddingVertical: 4,
          }}>
          {menuItemList.map(item => {
            return <MenuItem {...item} />;
          })}
        </Card>
      </View>
    </BaseLayout>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  titleText: {
    fontSize: 22,
    color: ColorBaseEnum.black,
    fontWeight: "bold",
  },
});
