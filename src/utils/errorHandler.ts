import { showFlashMessage } from "./showFlashMessage";

export const errorHandler = (props?: { message: string }) => {
  switch (props?.message) {
    case "User is already registered":
      showFlashMessage({
        type: "danger",
        message: "User dengan data tersebut telah terdaftar",
      });
      break;

    default:
      showFlashMessage({
        type: "danger",
        message: "Terjadi kesalahan, silahkan coba lagi nanti",
      });
      break;
  }
};
