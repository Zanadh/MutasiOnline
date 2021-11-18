import { Platform, BackHandler } from "react-native";

let currentCount = 0;
export const useBackPressExit = (exitHandler: (countPress: number) => void) => {
  if (Platform.OS === "ios") return;
  const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
    if (currentCount === 1) {
      exitHandler(currentCount);
      subscription.remove();
      return true;
    }
    exitHandler(currentCount);
    backPressHandler();
    return true;
  });
};

const backPressHandler = () => {
  if (currentCount < 1) {
    currentCount += 1;
  }
  setTimeout(() => {
    currentCount = 0;
  }, 2000);
};
