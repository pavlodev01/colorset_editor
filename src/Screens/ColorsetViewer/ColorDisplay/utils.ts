import { IColor } from "../../../utils/getColors";

const toHex = (num: number) => {
  const hex = num.toString(16).toUpperCase();
  return `0${hex}`.slice(-2);
};

export const getHexColor = (color: IColor) => {
  const { r, g, b } = color;
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
