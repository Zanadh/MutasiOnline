import React from "react";
import type {
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Landing: undefined;
  TabNavigator: undefined;
};

export interface AuthStackInterface {
  screen: "Landing" | "Login" | "Register";
}

const AuthStackNavigator = createStackNavigator();

const AuthStackOption = ({
  headerTitle,
}: {
  navigation: StackNavigationProp<AuthStackParamList, "Landing">;
  headerTitle?: string;
}): StackNavigationOptions => ({
  headerTitle: headerTitle,
  headerTitleAlign: "center",
  headerTitleStyle: { fontWeight: "500", fontSize: 16 },
  headerShown: false,
});

const AuthStack = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="Landing"
        component={LandingScreen}
        options={({ navigation }) => AuthStackOption({ navigation })}
      />
      <AuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={({ navigation }) => AuthStackOption({ navigation })}
      />
      <AuthStackNavigator.Screen
        name="Register"
        component={RegisterScreen}
        options={({ navigation }) => AuthStackOption({ navigation })}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthStack;
