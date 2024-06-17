export interface IColorset {
  _id: Realm.BSON.ObjectId,
  name: string,
  colors: number[],
  owner_id: string,
  viewers: string[],
}