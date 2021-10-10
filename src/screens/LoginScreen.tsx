import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";

import type { AuthStackParamList } from "../navigator/AuthenticationStack";

type AuthStackNavigationProp = NavigationProp<AuthStackParamList, "Login">;

const LoginScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
      <Button title="MASUK" onPress={() => navigation.navigate("HomeTab")} />
      <Button
        title="Belum terdaftar? Daftar di sini"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default LoginScreen;
