export interface IProps {
  visible: boolean;
  onDismiss: () => void;
  sharingItemId: Realm.BSON.ObjectId | null;
}

export interface IApiUser {
  _id: string;
  username: string;
  appServiceUserId: string;
}