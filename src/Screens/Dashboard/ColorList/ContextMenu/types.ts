export interface IProps {
  contextItemId: Realm.BSON.ObjectId | null;
  hideContext: () => void;
  showShareItemDialog: () => void;
  showConfirmDeleteItem: () => void;
}
