import AsyncStorage from "@react-native-async-storage/async-storage";

type StoredItemKey = "UserToken" | "UserRefreshToken";

export const _storeLocalStorageItem = async ({
  storageKey,
  storageValue,
}: {
  storageKey: StoredItemKey;
  storageValue: string;
}) => {
  try {
    await AsyncStorage.setItem(storageKey, storageValue);
  } catch (error) {
    return error;
  }
};

export const _retrieveLocalStorageItem = async (
  storageKey: StoredItemKey,
): Promise<string | null> => {
  return AsyncStorage.getItem(storageKey).then(value => {
    if (value !== null) {
      return value;
    }
    return null;
  });
};

export const _removeLocalStorageItem = async (storageKey: StoredItemKey) => {
  try {
    await AsyncStorage.removeItem(storageKey);
    return true;
  } catch (exception) {
    return false;
  }
};
