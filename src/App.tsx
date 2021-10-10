import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import * as React from "react";

import Navigator from "./navigator";

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Navigator />;
}

export default App;
