import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import type { ParamListBase, RouteProp } from "@react-navigation/native";
import SettingScreen from "@screens/SettingScreen";
import InfoScreen from "@screens/NotificationScreen";
import HomeScreen from "@screens/HomeScreen";
import ProgressListScreen from "@screens/ProgressListScreen";
import Icon from "react-native-vector-icons/FontAwesome";

export type TabParamList = {
  Home: undefined;
  Progress: undefined;
  Info: undefined;
  Setting: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const BottomTabsStack = createStackNavigator<TabParamList>();

const HomeNavigator = () => {
  return (
    <BottomTabsStack.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabsStack.Screen name="Home" component={HomeScreen} />
    </BottomTabsStack.Navigator>
  );
};

const ProgressListNavigator = () => {
  return (
    <BottomTabsStack.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabsStack.Screen name="Progress" component={ProgressListScreen} />
    </BottomTabsStack.Navigator>
  );
};

const NotificationNavigator = () => {
  return (
    <BottomTabsStack.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabsStack.Screen name="Info" component={InfoScreen} />
    </BottomTabsStack.Navigator>
  );
};

const SettingNavigator = () => {
  return (
    <BottomTabsStack.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabsStack.Screen name="Setting" component={SettingScreen} />
    </BottomTabsStack.Navigator>
  );
};

const customTabOptions: BottomTabNavigationOptions = {
  tabBarLabelStyle: { marginBottom: 4 },
  headerShown: false,
  tabBarStyle: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 5,
  },
};

const BottomTabs = () => {
  const customScreenOptions = (props: {
    route: RouteProp<ParamListBase, string>;
  }): BottomTabNavigationOptions => {
    const { route } = props;

    const customTabBarIcon = ({ color }: { color: string }) => {
      let iconName = "";
      switch (route.name) {
        case "Home":
          iconName = "home";
          break;
        case "Progress":
          iconName = "list";
          break;
        case "Info":
          iconName = "bell";
          break;
        default:
          iconName = "cog";
          break;
      }

      return <Icon name={iconName} size={20} color={color} />;
    };

    return { ...customTabOptions, tabBarIcon: customTabBarIcon };
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={customScreenOptions}>
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="Progress"
          component={ProgressListNavigator}
          options={{ tabBarLabel: "Progress" }}
        />
        <Tab.Screen
          name="Info"
          component={NotificationNavigator}
          options={{ tabBarLabel: "Info" }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingNavigator}
          options={{ tabBarLabel: "Settings" }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabs;
