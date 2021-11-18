import type BottomSheet from "@gorhom/bottom-sheet";
import type { Picker } from "@react-native-picker/picker";
import type { RouteProp } from "@react-navigation/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import BottomDrawer from "components/BottomDrawer/BottomDrawer";
import { Button } from "components/Button";
import HeaderBackground from "components/HeaderBackground";
import MenuItem from "components/MenuItem";
import { useFormik } from "formik";
import type {
  DataImageType,
  DataMutationType,
  MutationServiceType,
  SamsatType,
} from "interfaces/MutationInterface";
import type { BaseStackParamList } from "navigator";
import React, { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ColorBaseEnum, ColorBaseGrayEnum } from "styles/Colors";
import { isValidImage } from "utils/helpers";
import type { PickerType, Asset } from "utils/imagePicker";
import { imagePicker } from "utils/imagePicker";
import { showFlashMessage } from "utils/showFlashMessage";

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

interface handlePressPropsInterface {
  key: DataMutationType;
  type: InputType;
}

const inputRenderer = ({
  value,
  data,
  index,
  onPress,
}: {
  value: string;
  data: InputDataImageInterface;
  index: number;
  onPress: (data: handlePressPropsInterface) => void;
}) => {
  return (
    <Card style={styles.cardStyle} key={index}>
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
        {data.title}
      </Text>
      {data.type === "image" ? (
        <>
          <Button
            label={"Upload Image"}
            onPress={() => onPress({ key: data.key, type: data.type })}
          />
          {!!value && (
            <Image
              source={{ uri: value }}
              style={{ height: 200, borderRadius: 12, marginTop: 12 }}
            />
          )}
        </>
      ) : (
        // <DropDownPicker
        //   open={open}
        //   value={value}
        //   items={items}
        //   setOpen={setOpen}
        //   setValue={setValue}
        //   setItems={setItems}
        //   containerStyle={{ flex: 1 }}
        //   mode="BADGE"
        //   style={{
        //     borderRadius: 5,
        //     height: 40,
        //     borderColor: ColorBaseGrayEnum.gray400,
        //   }}
        //   itemSeparator
        //   itemSeparatorStyle={{ backgroundColor: ColorBaseGrayEnum.gray400 }}
        //   dropDownContainerStyle={{
        //     borderColor: ColorBaseGrayEnum.gray400,
        //   }}
        // />
        <TouchableOpacity
          style={styles.inputSelect}
          onPress={() => onPress({ key: data.key, type: data.type })}>
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

type InputType = "image" | "select";

interface InputInterface {
  title: string;
  type: InputType;
}

interface InputDataImageInterface extends InputInterface {
  key: DataImageType;
}
interface InputDataSamsatInterface extends InputInterface {
  key: SamsatType;
}

const listImageInput: Array<InputDataImageInterface> = [
  { title: "foto KTP", key: "KTP", type: "image" },
  { title: "foto surat kuasa", key: "powerOfAttorney", type: "image" },
  {
    title: "foto surat keterangan domisili",
    key: "certificateOfDomicile",
    type: "image",
  },
  { title: "foto npwp", key: "NPWP", type: "image" },
  {
    title: "foto izin usaha perdagangan",
    key: "businessTradeLicence",
    type: "image",
  },
  {
    title: "foto akta perubahan alamat",
    key: "deedOfAddressChange",
    type: "image",
  },
  { title: "foto bpkb asli", key: "BPKB", type: "image" },
  { title: "foto stnk asli", key: "STNK", type: "image" },
  {
    title: "foto kendaraan sisi depan",
    key: "frontSideVehicle",
    type: "image",
  },
  {
    title: "foto kendaraan sisi kiri",
    key: "leftSideVehicle",
    type: "image",
  },
  {
    title: "foto kendaraan sisi kanan",
    key: "rightSideVehicle",
    type: "image",
  },
  {
    title: "foto kendaraan sisi belakang",
    key: "rearSideVehicle",
    type: "image",
  },
];

const listSelectInput: Array<InputDataSamsatInterface> = [
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
    key: "samsatCheck",
    type: "select",
  },
];

const initialValues: Record<DataMutationType, Asset | string> = {
  KTP: {},
  BPKB: {},
  STNK: {},
  powerOfAttorney: {},
  NPWP: {},
  certificateOfDomicile: {},
  businessTradeLicence: {},
  deedOfAddressChange: {},
  frontSideVehicle: {},
  leftSideVehicle: {},
  rightSideVehicle: {},
  rearSideVehicle: {},
  samsatSource: "",
  samsatTarget: "",
  samsatCheck: "",
};

const samsatListHeaderTitle = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
];

const FormMutationScreen = () => {
  const { params } = useRoute<FormMutationRouteProp>();
  const navigation = useNavigation<FormMutationNavigationProp>();
  const sheetRef = useRef<BottomSheet>(null);
  const [inputDataState, setInputDataState] =
    useState<DataMutationType>("STNK");
  const [openSelect, setOpenSelect] = useState(false);
  const pickerRef = useRef<Picker<string>>(null);

  const handlePressInput = (data: handlePressPropsInterface) => {
    setInputDataState(data.key);
    if (data.type === "image") {
      sheetRef.current?.expand();
    }
  };

  const handlePressMedia = (type: PickerType) => async () => {
    try {
      const res = await imagePicker({
        type,
        cropping: true,
        width: 400,
        height: 400,
        includeBase64: true,
      });

      if (res) {
        if (res?.uri && isValidImage(res)) {
          const data = {
            name: res.fileName,
            type: res.type,
            uri: res.uri,
          };
          console.log(data);
          setFieldValue(inputDataState, data);
          setTimeout(() => {
            sheetRef.current?.close();
          }, 200);
        } else {
          showFlashMessage({
            message: "Format gambar profile tidak sesuai",
            type: "danger",
          });
          sheetRef.current?.close();
        }
      }
    } catch (error) {
      showFlashMessage({ type: "danger", message: e.message });
    }
  };

  const { values, setFieldValue } = useFormik({
    initialValues,
    onSubmit: () => undefined,
  });

  const samsatSelectCB = (selectedSamsat: string) => {
    console.log({ selectedSamsat });
  };

  const handlePressSelect = (data: InputDataSamsatInterface) => () => {
    navigation.push("SamsatList", {
      onSelectCB: samsatSelectCB,
      selectedSamsat: String(values[data.key]) || undefined,
      samsatType: data.key,
    });
  };

  return (
    <>
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
          {listImageInput.map((data, index) => {
            let value = "";
            if (typeof values[data.key] !== "string") {
              const tmpData: Asset = Object(values[data.key]);
              value = tmpData.uri || "";
            } else {
              value = String(values[data.key]);
            }
            return inputRenderer({
              data,
              index,
              onPress: handlePressInput,
              value,
            });
          })}
          {listSelectInput.map((data, index) => {
            return (
              <Card style={styles.cardStyle} key={index}>
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
                  {data.title}
                </Text>
                <TouchableOpacity
                  style={styles.inputSelect}
                  onPress={handlePressSelect(data)}>
                  <Text style={{ color: ColorBaseGrayEnum.gray600 }}>
                    {values[data.key] || "Pilih Samsat"}
                  </Text>
                  <Icon
                    name="chevron-right"
                    style={{ color: ColorBaseGrayEnum.gray600 }}
                  />
                </TouchableOpacity>
              </Card>
            );
          })}
          <Button
            label="Upload Dokumen"
            style={{ paddingVertical: 20 }}
            textStyle={{ fontSize: 18, fontWeight: "500" }}
          />
        </View>
      </BaseLayout>

      <BottomDrawer {...{ sheetRef }} bottomSheetStyle={{ paddingBottom: 0 }}>
        <View>
          <MenuItem title="Foto" onPress={handlePressMedia("CAMERA")} />
          <MenuItem title="Gallery" onPress={handlePressMedia("GALLERY")} />
        </View>
      </BottomDrawer>
    </>
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
