import { IApiUser } from "../types";

export interface IProps {
  itemId: Realm.BSON.ObjectId;
  handleUserSelect: (id: string) => void;
  searchUserList: IApiUser[];
  isLoading: boolean;
  isLimitReached: boolean;
}