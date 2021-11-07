import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import type { ComponentType } from "react";
import React from "react";
import SettingScreen from "@screens/SettingScreen";
import InfoScreen from "@screens/NotificationScreen";
import HomeScreen from "@screens/HomeScreen";
import ProgressListScreen from "@screens/ProgressListScreen";
import Icon from "react-native-vector-icons/FontAwesome";

export type TabParamList = {
  Home: undefined;
  Progress: undefined;
  Info: undefined;
  Settings: undefined;
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

const InfoNavigator = () => {
  return (
    <BottomTabsStack.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabsStack.Screen name="Info" component={InfoScreen} />
    </BottomTabsStack.Navigator>
  );
};

const SettingsNavigator = () => {
  return (
    <BottomTabsStack.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabsStack.Screen name="Settings" component={SettingScreen} />
    </BottomTabsStack.Navigator>
  );
};

const customTabOptions: BottomTabNavigationOptions = {
  tabBarLabelStyle: { marginBottom: 4 },
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    borderRadius: 15,
    marginHorizontal: 10,
    bottom: 10,
  },
  tabBarHideOnKeyboard: true,
  tabBarVisible: true,
};

const tabItem: Array<{
  name: keyof TabParamList;
  iconName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
}> = [
  { name: "Home", iconName: "home", component: HomeNavigator },
  { name: "Progress", iconName: "tasks", component: ProgressListNavigator },
  { name: "Info", iconName: "bell", component: InfoNavigator },
  { name: "Settings", iconName: "cog", component: SettingsNavigator },
];

const BottomTabs = () => (
  <Tab.Navigator initialRouteName="Home" screenOptions={customTabOptions}>
    {tabItem.map((tab, i) => (
      <Tab.Screen
        {...tab}
        options={{
          tabBarLabel: tab.name,
          tabBarIcon: ({ color }) => (
            <Icon name={tab.iconName} size={20} color={color} />
          ),
        }}
        key={i}
      />
    ))}
  </Tab.Navigator>
);

export default BottomTabs;
