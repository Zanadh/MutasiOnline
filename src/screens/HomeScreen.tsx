import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";

import type { AuthStackParamList } from "../navigator/AuthenticationStack";

type AuthStackNavigationProp = NavigationProp<AuthStackParamList, "Login">;
const HomeScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
