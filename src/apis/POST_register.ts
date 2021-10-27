import type { BaseResponseRestInterface } from "interfaces/ResponseInterface";
import type { AxiosError } from "axios";

import type { UserInterface } from "../interfaces/UserInterface";

import apis from "./apis";
import { axiosInstance } from "./axios.config";

export interface PostBodyRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  nik: string;
}

export const postRegister = async (
  body: PostBodyRegister,
): Promise<BaseResponseRestInterface<UserInterface | null>> => {
  return axiosInstance
    .post<BaseResponseRestInterface<UserInterface>>(apis.auth.register, body)
    .then(res => res.data)
    .catch((err: AxiosError) => err.response?.data);
};
