import { IColor } from "../../../utils/getColors";

export interface IProps {
  totalColors: number;
  color: IColor;
  isEditor: boolean;
  handleRemoveColor: () => void;
  handleAddColor: () => void;
}
