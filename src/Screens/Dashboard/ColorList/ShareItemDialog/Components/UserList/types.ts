import { IApiUser } from "../../types";

export interface IProps {
  title: string;
  users: IApiUser[];
  handleUserSelect: (_id: string) => void,
  isShared?: boolean;
  isLoading: boolean;
  warning?: string;
}
