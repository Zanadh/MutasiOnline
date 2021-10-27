import type { AxiosRequestConfig } from "axios";
import Axios from "axios";
import {
  _removeLocalStorageItem,
  _retrieveLocalStorageItem,
  _storeLocalStorageItem,
} from "utils/localStorage";
import config from "react-native-config";

const defaultOptions: AxiosRequestConfig = {
  baseURL: config.API_BASE_URL,
  timeout: 30000,
};

export const axiosInstance = Axios.create(defaultOptions);

axiosInstance.interceptors.request.use(async req => {
  const accessToken = (await _retrieveLocalStorageItem("UserToken")) || null;
  if (accessToken) {
    Object.assign(req.headers, { Authorization: `Bearer ${accessToken}` });
  }

  return req;
});

axiosInstance.interceptors.response.use(async res => {
  console.log({ res });

  return res;
});
