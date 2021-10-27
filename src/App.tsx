import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import * as React from "react";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import Navigator from "./navigator";
import AppAuthContext from "./context/AppUserProfileContext";
import { ColorBaseEnum } from "./styles/Colors";

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <Navigator />
      <FlashMessage
        position="top"
        duration={3000}
        hideOnPress
        titleStyle={{ paddingLeft: 15 }}
        color={ColorBaseEnum.white}
        icon="auto"
        renderFlashMessageIcon={() => <Icon name="info" color="white" />}
        style={{ alignItems: "center" }}
        canRegisterAsDefault
        statusBarHeight={StatusBar.currentHeight}
      />
    </>
  );
}

export default App;
