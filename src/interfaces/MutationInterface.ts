export type MutationServiceType =
  | "PERSONAL"
  | "CORPORATE"
  | "GOVERNMENT_INSTITUTION";

export type MutationType =
  | "AddressChange"
  | "NameTransfer"
  | "ColorChange"
  | "ShapeChange"
  | "PlateNumberChange";

export enum MutationTypeEnum {
  AddressChange = "AddressChange",
  OwnerNameTransfer = "OwnerNameTransfer",
  ColorChange = "ColorChange",
  ShapeChange = "ShapeChange",
  PlateNumberChange = "PlateNumberChange",
}

export enum MutationDisplayNameEnum {
  AddressChange = "Mutasi Pindah Alamat",
  OwnerNameTransfer = "Mutasi Balik Nama",
  ColorChange = "Mutasi Ganti Warna",
  ShapeChange = "Mutasi Rubah Bentuk",
  PlateNumberChange = "Mutasi Ganti Nomor Polisi",
}

export enum MutationServiceTypeEnum {
  personal = "PERSONAL",
  corporate = "CORPORATE",
  governmemtInstitution = "GORVERNMENT_INSTITUTION",
}
