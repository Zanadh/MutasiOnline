import { BellIcon } from "@assets/Icons";
import React from "react";
import type { SvgProps } from "react-native-svg";

import type { IconProps } from "./Icon.type";

// eslint-disable-next-line no-undef
const Icon = ({ name, color, size }: IconProps): JSX.Element => {
  const svgIconProps: SvgProps = {
    fill: color || "#212121",
    height: size || "24px",
    width: size || "24px",
  };

  const strokeSvgIconProps: SvgProps = {
    stroke: color || "#212121",
    height: size || "24px",
    width: size || "24px",
  };

  // eslint-disable-next-line no-undef
  const iconName: Record<string, JSX.Element> = {
    bell: <BellIcon {...svgIconProps} />,
    home: <BellIcon {...strokeSvgIconProps} />,
    progress: <BellIcon {...strokeSvgIconProps} />,
    setting: <BellIcon {...strokeSvgIconProps} />,
  };

  return iconName[name] || <BellIcon {...svgIconProps} />;
};

export default Icon;
