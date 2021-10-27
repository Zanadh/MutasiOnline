import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import type { KeyboardType } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFormik } from "formik";
import Icon from "react-native-vector-icons/FontAwesome";
import * as yup from "yup";

import { Button } from "../components/Button";
import TextInput from "../components/Forms/TextInput";
import HeaderBackground from "../components/HeaderBackground";
import type { AuthStackParamList } from "../navigator/AuthenticationStack";
import { ColorBaseEnum, ColorPrimaryEnum } from "../styles/Colors";
import "yup-phone";
import { postRegister } from "../apis/POST_register";
import { showFlashMessage } from "../utils/showFlashMessage";
import { errorHandler } from "../utils/errorHandler";

type AuthStackNavigationProp = NavigationProp<AuthStackParamList, "Register">;

const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  nik: "",
  email: "",
  password: "",
  repassword: "",
};

const inputFieldsList: Array<{
  key: keyof typeof initialValues;
  placeholder: string;
  prefixIcon: string;
  keyboardType?: KeyboardType;
}> = [
  { key: "firstName", placeholder: "Nama Depan", prefixIcon: "user" },
  { key: "lastName", placeholder: "Nama Belakang", prefixIcon: "user" },
  {
    key: "phone",
    placeholder: "Nomor Telepon",
    prefixIcon: "phone",
    keyboardType: "phone-pad",
  },
  { key: "nik", placeholder: "NIK", prefixIcon: "address-card" },
  { key: "email", placeholder: "E-mail", prefixIcon: "at" },
  { key: "password", placeholder: "Kata Sandi", prefixIcon: "lock" },
  {
    key: "repassword",
    placeholder: "Konfirmasi Kata Sandi",
    prefixIcon: "lock",
  },
];

const registFormSchema = yup
  .object({
    firstName: yup
      .string()
      .required("nama wajib di isi")
      .min(3, "tidak bisa kurang dari 3 huruf"),
    lastName: yup
      .string()
      .required("nama wajib di isi")
      .min(3, "tidak bisa kurang dari 3 huruf"),
    phone: yup
      .string()
      .phone("ID", false, "format No.HP salah")
      .required("No.HP wajib di isi")
      .matches(/(^(628)|^(08))+\d*$/, "format No.HP salah"),
    nik: yup
      .string()
      .required("NIK wajib di isi")
      .min(3, "tidak bisa kurang dari 3 huruf"),
    email: yup
      .string()
      .email("format email belum sesuai")
      .required("email wajib di isi"),
    password: yup
      .string()
      .required("password wajib di isi")
      .min(6, "tidak bisa kurang dari 6 huruf"),
    repassword: yup
      .string()
      .required("password wajib di isi")
      .min(6, "tidak bisa kurang dari 6 huruf"),
  })
  .required();

const RegisterScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, handleChange, handleBlur, touched, errors, values } =
    useFormik({
      initialValues,
      onSubmit: async data => {
        try {
          setIsLoading(true);
          const res = await postRegister(data);
          console.log({ res });
          if (res.success) {
            showFlashMessage({
              type: "success",
              message:
                "Pendaftaran akun berhasil, silahkan login dengan akun baru mu",
            });
          } else {
            errorHandler(res);
          }
        } catch (error) {
          errorHandler();
        } finally {
          setIsLoading(false);
        }
      },
      validationSchema: registFormSchema,
      validateOnMount: true,
    });

  useEffect(() => {
    console.log({ touched: touched.firstName, errors: errors.firstName });
  }, [errors, touched]);

  useEffect(() => {
    setIsPasswordMatch(values.password === values.repassword);
  }, [values.password, values.repassword]);

  return (
    <ScrollView>
      <HeaderBackground />
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Buat Akun</Text>
        <View style={styles.formContainer}>
          {inputFieldsList.map(item => {
            return (
              <TextInput
                {...item}
                onChangeText={handleChange(item.key)}
                secureTextEntry={item.prefixIcon === "lock"}
                errorMessage={
                  (touched[item.key] && errors[item.key]) ||
                  (item.key === "repassword" &&
                    !isPasswordMatch &&
                    "Password tidak sama") ||
                  ""
                }
                handleBlur={handleBlur(item.key)}
              />
            );
          })}
          <Icon name={"check"} color={ColorBaseEnum.white} />
          <View style={{ display: "flex", marginTop: 16 }}>
            <Button
              label="BUAT AKUN"
              textStyle={{ fontWeight: "600" }}
              onPress={handleSubmit}
              disabled={!!Object.keys(errors).length || !isPasswordMatch}
              isLoading={isLoading}
            />
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
    </ScrollView>
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
