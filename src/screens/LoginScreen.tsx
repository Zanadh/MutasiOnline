import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Button } from "../components/Button";
import TextInput from "../components/Forms/TextInput";
import HeaderBackground from "../components/HeaderBackground";
import type { AuthStackParamList } from "../navigator/AuthenticationStack";
import { ColorBaseEnum, ColorPrimaryEnum } from "../styles/Colors";

type AuthStackNavigationProp = NavigationProp<AuthStackParamList, "Login">;

const inputFieldsList = [
  { key: "email", placeholder: "E-mail", prefixIcon: "user" },
  { key: "password", placeholder: "Kata Sandi", prefixIcon: "lock" },
];

const LoginScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  const handlePressLogin = () => {
    navigation.navigate("HomeTab");
  };

  return (
    <View style={{ padding: 16 }}>
      <HeaderBackground />
      <Text style={styles.title}>Masuk</Text>
      <View style={styles.formContainer}>
        {inputFieldsList.map(item => {
          return (
            <TextInput {...item} secureTextEntry={item.prefixIcon === "lock"} />
          );
        })}
        <View style={{ display: "flex", marginTop: 16 }}>
          <Button
            label="Masuk"
            textStyle={{ fontWeight: "600" }}
            onPress={handlePressLogin}
          />
          <TouchableOpacity
            style={{
              marginTop: 16,
              alignSelf: "flex-end",
            }}
            onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                color: ColorPrimaryEnum.secondary,
              }}>
              Belum punya akun? Daftar di sini
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
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
