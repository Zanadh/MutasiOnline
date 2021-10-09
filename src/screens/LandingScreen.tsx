import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Button, View, Text } from "react-native";

import type { AuthStackParamList } from "../navigator/AuthenticationStack";

export type AuthStackNavigationProp = NavigationProp<
  AuthStackParamList,
  "Landing"
>;

const LandingScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  return (
    <View>
      <Text>Landing Screenss</Text>
      <Button title="asdasd" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default LandingScreen;
