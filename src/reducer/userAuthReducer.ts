import removeUserAuth, { removeAllUserAuth } from "../utils/removeUserAuth";

type State = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
  userRefreshToken: string | null;
};

export enum ActionTypeEnum {
  "RESTORE_TOKEN" = "RESTORE_TOKEN",
  "SIGN_IN" = "SIGN_IN",
  "SIGN_OUT" = "SIGN_OUT",
  "SIGN_OUT_ALL" = "SIGN_OUT_ALL",
}

interface Action {
  type: ActionTypeEnum;
  userToken: string | null;
  userRefreshToken: string | null;
  deviceToken: string | null;
}

export const initialStateUserAuthReducer: State = {
  isLoading: true,
  isSignout: false,
  userRefreshToken: null,
  userToken: null,
};

export const userAuthReducer = (prevState: State, action: Action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.userToken,
        userRefreshToken: action.userRefreshToken,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.userToken,
        userRefreshToken: action.userRefreshToken,
        deviceToken: action.deviceToken,
      };
    case "SIGN_OUT": {
      removeUserAuth();
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        userRefreshToken: null,
        deviceToken: null,
      };
    }
    case "SIGN_OUT_ALL": {
      removeAllUserAuth();
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        userRefreshToken: null,
        deviceToken: null,
      };
    }
    default:
      return prevState;
  }
};
