import { IColor } from "../../../utils/getColors";

export interface IProps {
  colors: IColor[];
  handleChangeColorIndex: (index: number) => void;
  selectedColorIndex: number;
}
