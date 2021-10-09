import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";

import type { AuthStackParamList } from "../navigator/AuthenticationStack";

type AuthStackNavigationProp = NavigationProp<AuthStackParamList, "Login">;
const ProgressListScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ProgressList Screen</Text>
      <Button title="BACK" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ProgressListScreen;
