import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

import { Card } from "../components/Card";
import HeaderBackground from "../components/HeaderBackground";
import type { BaseStackParamList } from "../navigator";
import { ColorBaseEnum, ColorBaseGrayEnum } from "../styles/Colors";

type ProgressListScreenNavigationProp = StackNavigationProp<
  BaseStackParamList,
  "Progress"
>;
const HeaderComponent = () => {
  return (
    <View style={styles.header}>
      <HeaderBackground
        style={{
          height: 50,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 16,
          paddingBottom: 8,
        }}>
        <Text
          style={[
            styles.titleText,
            {
              color: ColorBaseEnum.white,
            },
          ]}>
          Progress
        </Text>
      </View>
    </View>
  );
};

export type RequestStatusType =
  | "pending"
  | "fileVerifyFailed"
  | "fileVerifySuccess"
  | "verifyVehicle"
  | "waitingPickup"
  | "complete";

const statusDisplayName = {
  pending: { text: "Berkas sedang dalam proses verifikasi", icon: "tasks" },
  fileVerifyFailed: { text: "Verifikasi berkas gagal", icon: "tasks" },
  fileVerifySuccess: { text: "Verifikasi fisik kendaraan", icon: "tasks" },
  verifyVehicle: { text: "Verifikasi fisik kendaraan", icon: "tasks" },
  waitingPickup: { text: "Mutasi selesai", icon: "tasks" },
  complete: { text: "Mutasi selesai", icon: "tasks" },
};

const RequestItemCard = ({
  status = "pending",
  ownerName,
  paymentFee,
}: {
  status: RequestStatusType;
  ownerName: string;
  paymentFee?: number;
}) => {
  const navigation = useNavigation<ProgressListScreenNavigationProp>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("MutasiDetail")}>
      <Card style={{ borderRadius: 5, marginHorizontal: 10, display: "flex" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 4,
          }}>
          <View style={{ marginRight: 8 }}>
            <Icon name="tasks" />
          </View>
          <Text style={{ color: ColorBaseGrayEnum.gray700, fontSize: 12 }}>
            {statusDisplayName[status].text}
          </Text>
        </View>
        <View
          style={{ height: 1, backgroundColor: ColorBaseGrayEnum.gray400 }}
        />
        <View style={{ paddingTop: 10 }}>
          <Text style={{ color: ColorBaseGrayEnum.gray700, fontWeight: "700" }}>
            {statusDisplayName[status].text}
          </Text>
          <Text style={{ fontSize: 11, color: ColorBaseGrayEnum.gray700 }}>
            {ownerName}
          </Text>
        </View>
        {paymentFee && (
          <View style={{ paddingTop: 10 }}>
            <Text style={{ fontSize: 11, color: ColorBaseGrayEnum.gray700 }}>
              {"Rp. " + paymentFee}
            </Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const ProgressListScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  useEffect(() => {
    console.log({ value });
  }, [value]);
  return (
    <View style={{ display: "flex", flex: 1 }}>
      <HeaderComponent />
      <View
        style={{
          paddingHorizontal: 12,
          display: "flex",
          flexDirection: "row",
          marginBottom: 16,
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 70,
          }}>
          <Icon name="filter" />
          <Text
            style={{
              color: ColorBaseEnum.black,
              fontWeight: "600",
              marginLeft: 4,
            }}>
            Status :
          </Text>
        </View>
        <DropDownPicker
          multiple
          multipleText={"" + value.join(", ")}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={{ flex: 1 }}
          mode="BADGE"
          style={{
            borderRadius: 5,
            height: 40,
            borderColor: ColorBaseGrayEnum.gray400,
          }}
          itemSeparator
          itemSeparatorStyle={{ backgroundColor: ColorBaseGrayEnum.gray400 }}
          dropDownContainerStyle={{
            borderColor: ColorBaseGrayEnum.gray400,
          }}
        />
      </View>
      <ScrollView
        onTouchStart={() => setOpen(false)}
        style={{
          marginTop: 4,
          flex: 1,
          paddingBottom: 200,
        }}>
        {/* {Array.from(Array(4)).map(() => {
          return (
            <RequestItemCard
              ownerName="M. Rahman Muttaqin"
              status="pending"
              paymentFee={150000}
            />
          );
        })} */}
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

export default ProgressListScreen;

const styles = StyleSheet.create({
  header: {
    marginBottom: 12,
  },
  titleText: {
    fontSize: 22,
    color: ColorBaseEnum.black,
    fontWeight: "bold",
  },
});
