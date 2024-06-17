import { IColor } from "../../../utils/getColors";

export interface IProps {
  color: IColor;
  handleColorValueChange: (colorIndex: number, newColorValue: number) => void;
}
