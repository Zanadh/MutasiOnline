import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Button } from "../components/Button";
import TextInput from "../components/Forms/TextInput";
import HeaderBackground from "../components/HeaderBackground";
import type { AuthStackParamList } from "../navigator/AuthenticationStack";
import { ColorBaseEnum, ColorPrimaryEnum } from "../styles/Colors";

type AuthStackNavigationProp = NavigationProp<AuthStackParamList, "Register">;

const inputFieldsList = [
  { key: "fullName", placeholder: "Nama Anda", prefixIcon: "user" },
  { key: "phone", placeholder: "Nomor Telepon", prefixIcon: "phone" },
  { key: "nik", placeholder: "NIK", prefixIcon: "address-card" },
  { key: "email", placeholder: "E-mail", prefixIcon: "at" },
  { key: "password", placeholder: "Kata Sandi", prefixIcon: "lock" },
  {
    key: "repassword",
    placeholder: "Konfirmasi Kata Sandi",
    prefixIcon: "lock",
  },
];

const RegisterScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  return (
    <View style={{ padding: 16 }}>
      <HeaderBackground />
      <Text style={styles.title}>Buat Akun</Text>
      <View style={styles.formContainer}>
        {inputFieldsList.map(item => {
          return (
            <TextInput {...item} secureTextEntry={item.prefixIcon === "lock"} />
          );
        })}
        <View style={{ display: "flex", marginTop: 16 }}>
          <Button label="BUAT AKUN" textStyle={{ fontWeight: "600" }} />
          <TouchableOpacity
            style={{
              marginTop: 16,
              alignSelf: "center",
            }}
            onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                textAlign: "center",
                color: ColorPrimaryEnum.secondary,
              }}>
              Sudah Mendaftar? Masuk di sini
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  title: {
    color: ColorBaseEnum.white,
    fontSize: 24,
    fontWeight: "700",
  },
  formContainer: {
    backgroundColor: ColorBaseEnum.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 24,
    borderRadius: 12,
  },
});
