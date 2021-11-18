import type { Asset } from "./imagePicker";

export const isValidImage = (asset: Asset): boolean =>
  !!asset.type?.match(/(jpg|jpeg|png)$/);
