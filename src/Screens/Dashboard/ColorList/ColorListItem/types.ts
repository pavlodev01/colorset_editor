import { NavigationProp } from "@react-navigation/native";

import { IColorset } from "../../../../types/colorset";
import { NavigatorStackParamList } from "../../../../Navigator/Navigator";

export type TDashboardNavigation = NavigationProp<NavigatorStackParamList, "Dashboard">;

export interface IProps {
  item: IColorset & Realm.Object;
  showContext: (id: Realm.BSON.ObjectId) => void;
}
