import { IApiUser } from "../types";

export interface IProps {
  handleUserSelect: (id: string) => void;
  itemId: Realm.BSON.ObjectId;
  contactList: IApiUser[];
  isLoading: boolean;
}