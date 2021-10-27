import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";

import { Button } from "../components/Button";
import TextInput from "../components/Forms/TextInput";
import HeaderBackground from "../components/HeaderBackground";
import type { AuthStackParamList } from "../navigator/AuthenticationStack";
import { ColorBaseEnum, ColorPrimaryEnum } from "../styles/Colors";
import { postLogin } from "../apis/POST_login";
import { showFlashMessage } from "../utils/showFlashMessage";
import { errorHandler } from "../utils/errorHandler";
import { AuthContext } from "../context/AuthContext";

type AuthStackNavigationProp = NavigationProp<AuthStackParamList, "Login">;

const inputFieldsList: Array<{
  key: keyof typeof initialValues;
  placeholder: string;
  prefixIcon: string;
}> = [
  { key: "email", placeholder: "E-mail", prefixIcon: "user" },
  { key: "password", placeholder: "Kata Sandi", prefixIcon: "lock" },
];

const initialValues = {
  email: "",
  password: "",
};

const loginFormSchema = yup
  .object({
    email: yup
      .string()
      .email("format email belum sesuai")
      .required("email wajib di isi"),
    password: yup
      .string()
      .required("password wajib di isi")
      .min(6, "tidak bisa kurang dari 6 huruf"),
  })
  .required();

const LoginScreen = () => {
  const { signIn } = React.useContext(AuthContext);
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, handleChange, handleBlur, touched, errors } = useFormik(
    {
      initialValues,
      onSubmit: async data => {
        try {
          setIsLoading(true);
          await signIn(data);
        } catch (error) {
          errorHandler();
        } finally {
          setIsLoading(false);
        }
      },
      validationSchema: loginFormSchema,
      validateOnMount: true,
    },
  );

  return (
    <View style={{ padding: 16 }}>
      <HeaderBackground />
      <Text style={styles.title}>Masuk</Text>
      <View style={styles.formContainer}>
        {inputFieldsList.map(item => {
          return (
            <TextInput
              {...item}
              secureTextEntry={item.prefixIcon === "lock"}
              onChangeText={handleChange(item.key)}
              handleBlur={handleBlur(item.key)}
              errorMessage={(touched[item.key] && errors[item.key]) || ""}
            />
          );
        })}
        <View style={{ display: "flex", marginTop: 16 }}>
          <Button
            label="Masuk"
            textStyle={{ fontWeight: "600" }}
            onPress={handleSubmit}
            isLoading={isLoading}
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
