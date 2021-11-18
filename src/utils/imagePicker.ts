import { Alert } from "react-native";
import type { Image } from "react-native-image-crop-picker";
import ImagePicker from "react-native-image-crop-picker";
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from "react-native-permissions";

import { showFlashMessage } from "./showFlashMessage";

export type PickerType = "GALLERY" | "CAMERA";
interface ImagePickerPropsInterface {
  type: PickerType;
  cropping?: boolean;
  includeBase64?: boolean;
  width?: number;
  height?: number;
  compress?: {
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
  };
}
export interface Asset {
  base64?: string;
  uri?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  type?: string;
  fileName?: string;
  duration?: number;
}

const requestPropsMapper = {
  GALLERY: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  CAMERA: PERMISSIONS.ANDROID.CAMERA,
};

const checkPermission = async ({ type }: { type: PickerType }) => {
  const permissionType = requestPropsMapper[type];
  const permissionName = type === "CAMERA" ? "camera" : "gallery";
  const result = await check(permissionType);
  console.log(result);

  switch (result) {
    case RESULTS.BLOCKED:
      Alert.alert(
        "Permission Blocked",
        `Please allow Yummyshop to access your ${permissionName}`,
        [{ text: "Ok", onPress: openSettings }],
      );
      break;
    case RESULTS.DENIED:
      request("android.permission.CAMERA");
      break;
    case RESULTS.UNAVAILABLE:
      request(permissionType);
      break;
    default:
      return true;
  }
  return false;
};

export const imagePicker = async ({
  cropping,
  width,
  height,
  compress,
  type,
  includeBase64,
}: ImagePickerPropsInterface) => {
  try {
    const permission = await checkPermission({ type });
    console.log(permission);
    if (!permission) return null;

    const pickerSetting = {
      includeBase64,
      width,
      height,
      cropping,
      compressImageMaxWidth: compress?.maxWidth,
      compressImageMaxHeight: compress?.maxHeight,
      compressImageQuality: compress?.quality,
      enableRotationGesture: true,
    };

    let image: Image;

    if (type === "GALLERY") {
      image = await ImagePicker.openPicker(pickerSetting);
    } else {
      image = await ImagePicker.openCamera(pickerSetting);
    }
    return {
      fileName: image.filename || "image",
      type: image.mime,
      uri: image.path,
      width: image.width,
      height: image.height,
      mime: image.mime,
      base64: image.data || undefined,
    };
  } catch (e) {
    showFlashMessage({ type: "danger", message: e.message });
    throw e;
  }
};
