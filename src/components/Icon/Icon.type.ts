export type IconType = "home" | "progress" | "bell" | "setting";

export interface IconProps {
  name: IconType;
  size?: string;
  color?: string;
}
