import { _removeLocalStorageItem } from "./localStorage";

const clearCache = async () => {
  try {
    _removeLocalStorageItem("UserToken");
    _removeLocalStorageItem("UserRefreshToken");
  } catch (error) {}
};

const removeUserAuth = async () => await clearCache();

export const removeAllUserAuth = async () => {
  try {
    await clearCache();
  } catch (error) {}
};

export default removeUserAuth;
