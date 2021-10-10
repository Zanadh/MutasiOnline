import React from "react";
import type { StackNavigationOptions } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import {
  initialStateUserAuthReducer,
  userAuthReducer,
} from "../reducer/userAuthReducer";

import type { AuthStackInterface } from "./AuthenticationStack";
import AuthStack from "./AuthenticationStack";
import type { TabParamList } from "./BottomTabs";
import BottomTabs from "./BottomTabs";

export type BaseStackParamList = TabParamList & {
  AuthStack?: AuthStackInterface;
  HomeTab?: undefined;
};

export type RootStackParamList = BaseStackParamList;
const RootStack = createStackNavigator<RootStackParamList>();

const ScreenDefaultOption: StackNavigationOptions = {
  headerShown: false,
  presentation: "card",
};

const Navigator = () => {
  const [state, dispatch] = React.useReducer(
    userAuthReducer,
    initialStateUserAuthReducer,
  );

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="AuthStack"
        detachInactiveScreens
        defaultScreenOptions={ScreenDefaultOption}>
        <RootStack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="HomeTab"
          options={{
            headerShown: false,
          }}
          children={() => <BottomTabs />}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
