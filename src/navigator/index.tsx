import React, { useEffect } from "react";
import type { StackNavigationOptions } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

import {
  ActionTypeEnum,
  initialStateUserAuthReducer,
  userAuthReducer,
} from "../reducer/userAuthReducer";
import MutasiDetailScreen from "../screens/MutasiDetailScreen";
import {
  _retrieveLocalStorageItem,
  _storeLocalStorageItem,
} from "../utils/localStorage";
import type { PostBodyLogin } from "../apis/POST_login";
import { postLogin } from "../apis/POST_login";
import { errorHandler } from "../utils/errorHandler";
import { AuthContext } from "../context/AuthContext";

import type { AuthStackInterface } from "./AuthenticationStack";
import AuthStack from "./AuthenticationStack";
import type { TabParamList } from "./BottomTabs";
import BottomTabs from "./BottomTabs";

export type BaseStackParamList = TabParamList & {
  AuthStack?: AuthStackInterface;
  HomeTab?: undefined;
  MutasiDetail: undefined;
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

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null;
      let userRefreshToken: string | null = null;
      try {
        userToken = await _retrieveLocalStorageItem("UserToken");
        userRefreshToken = await _retrieveLocalStorageItem("UserRefreshToken");
      } catch (e) {
        // Restoring token failed
      }
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({
        type: ActionTypeEnum.RESTORE_TOKEN,
        userToken,
        userRefreshToken,
      });
    };

    bootstrapAsync();
  }, []);

  const authUserLogin = React.useCallback(async (data: PostBodyLogin) => {
    return await postLogin({
      email: data.email.trim(),
      password: data.password.trim(),
    }).then(({ data: loginResData, message, success }) => {
      if (success && loginResData?.accessToken) {
        _storeLocalStorageItem({
          storageKey: "UserToken",
          storageValue: loginResData.accessToken,
        });
        _storeLocalStorageItem({
          storageKey: "UserRefreshToken",
          storageValue: loginResData.refreshToken,
        });
        dispatch({
          type: ActionTypeEnum.SIGN_IN,
          userToken: loginResData.accessToken,
          userRefreshToken: loginResData.refreshToken,
        });
      } else {
        errorHandler({ message });
      }
    });
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: PostBodyLogin) => {
        await authUserLogin(data);
      },
      signOut: async () => {
        const type = ActionTypeEnum.SIGN_OUT;
        dispatch({
          type,
          userToken: null,
          userRefreshToken: null,
        });
      },
    }),
    [authUserLogin],
  );

  if (state.isLoading) {
    return (
      <>
        <ActivityIndicator />
      </>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="AuthStack"
          detachInactiveScreens
          defaultScreenOptions={ScreenDefaultOption}>
          {!state.userToken ? (
            <RootStack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <>
              <RootStack.Screen
                name="HomeTab"
                options={{
                  headerShown: false,
                }}
                children={() => <BottomTabs />}
              />
              <RootStack.Screen
                name="MutasiDetail"
                component={MutasiDetailScreen}
              />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigator;
