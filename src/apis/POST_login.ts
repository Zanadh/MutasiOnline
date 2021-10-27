import type { BaseResponseRestInterface } from "interfaces/ResponseInterface";
import type { AxiosError } from "axios";

import apis from "./apis";
import { axiosInstance } from "./axios.config";

export interface PostBodyLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const postLogin = async (
  body: PostBodyLogin,
): Promise<BaseResponseRestInterface<LoginResponse | null>> => {
  return axiosInstance
    .post<BaseResponseRestInterface<LoginResponse>>(apis.auth.login, body)
    .then(res => res.data)
    .catch((err: AxiosError) => err.response?.data);
};
