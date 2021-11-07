import type { RouteProp } from "@react-navigation/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "components/Button";
import HeaderBackground from "components/HeaderBackground";
import type { MutationServiceType } from "interfaces/MutationInterface";
import type { BaseStackParamList } from "navigator";
import type { FC } from "react";
import React, { useMemo, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ColorBaseEnum, ColorBaseGrayEnum } from "styles/Colors";

import { Card } from "../components/Card";
import { BaseLayout } from "../components/Layout";

export type RequestStatusType =
  | "pending"
  | "fileVerifyFailed"
  | "fileVerifySuccess"
  | "verifyVehicle"
  | "waitingPickup"
  | "complete";

type FormMutationNavigationProp = StackNavigationProp<
  BaseStackParamList,
  "FormMutation"
>;
type FormMutationRouteProp = RouteProp<BaseStackParamList, "FormMutation">;

const titleTextMapper: Record<MutationServiceType, string> = {
  PERSONAL: "Mutasi Perorangan",
  CORPORATE: "Mutasi Badan Hukum",
  GOVERNMENT_INSTITUTION: "Mutasi Instansi Pemerintah",
};

const inputRenderer = (props: InputDataInterface) => {
  return (
    <Card style={styles.cardStyle}>
      <Text
        style={[
          styles.titleText,
          {
            color: ColorBaseGrayEnum.gray700,
            marginLeft: 0,
            textTransform: "capitalize",
            marginBottom: 16,
          },
        ]}>
        {props.title}
      </Text>
      {props.type === "image" ? (
        <Button label="Upload Image" />
      ) : (
        <TouchableOpacity style={styles.inputSelect}>
          <Text style={{ color: ColorBaseGrayEnum.gray600 }}>Pilih Samsat</Text>
          <Icon
            name="chevron-down"
            style={{ color: ColorBaseGrayEnum.gray600 }}
          />
        </TouchableOpacity>
      )}
    </Card>
  );
};

interface InputDataInterface {
  title: string;
  key: string;
  type: "image" | "select";
}

const FormMutationScreen = () => {
  const { params } = useRoute<FormMutationRouteProp>();
  const navigation = useNavigation<FormMutationNavigationProp>();

  const listInput: Array<InputDataInterface> = useMemo(
    () => [
      { title: "foto surat kuasa", key: "asd", type: "image" },
      { title: "foto surat keterangan domisili", key: "asd", type: "image" },
      { title: "foto npwp", key: "asd", type: "image" },
      { title: "foto izin usaha perdagangan", key: "asd", type: "image" },
      { title: "foto akta perubahan alamat", key: "asd", type: "image" },
      { title: "foto bpkb asli", key: "asd", type: "image" },
      { title: "foto stnk asli", key: "asd", type: "image" },
      { title: "foto kendaraan sisi depan", key: "asd", type: "image" },
      { title: "foto kendaraan sisi kiri", key: "asd", type: "image" },
      { title: "foto kendaraan sisi kanan", key: "asd", type: "image" },
      { title: "foto kendaraan sisi belakang", key: "asd", type: "image" },
      {
        title: "pilih samsat asal kendaraan",
        key: "samsatSource",
        type: "select",
      },
      {
        title: "pilih samsat tujuan kendaraan",
        key: "samsatTarget",
        type: "select",
      },
      {
        title: "pilih samsat untuk cek fisik",
        key: "samsatOnsite",
        type: "select",
      },
    ],
    [],
  );

  return (
    <BaseLayout
      style={{
        paddingTop: 0,
        paddingHorizontal: 0,
      }}>
      <HeaderBackground />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="chevron-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.titleText}>
          {titleTextMapper[params.mutationServiceType]}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        {listInput.map(inputRenderer)}
        <Button
          label="Upload Dokumen"
          style={{ paddingVertical: 20 }}
          textStyle={{ fontSize: 18, fontWeight: "500" }}
        />
      </View>
    </BaseLayout>
  );
};

export default FormMutationScreen;

const styles = StyleSheet.create({
  cardStyle: {
    elevation: 0,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  contentContainer: {
    padding: 12,
  },
  headerContainer: {
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    color: ColorBaseEnum.white,
    fontWeight: "bold",
    marginLeft: 22,
  },
  inputSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
});
