import React from "react";

import { useObject } from "../../../../../RealmProviders";
import { IColorset } from "../../../../../types/colorset";

import UserList from "../Components/UserList";

import { IProps } from "./types";

const AlreadySharedUserList = ({ itemId, handleUserSelect, contactList, isLoading }: IProps) => {
  const colorSet = useObject<IColorset>("Colorsets", itemId);

  if (!colorSet?.viewers?.length) {
    return null;
  }

  const users = colorSet.viewers.map(viewerId => {
    const viewerUser = contactList.find(u => u.appServiceUserId === viewerId);
    return {
      _id: viewerUser?.appServiceUserId || viewerId,
      username: viewerUser?.username || viewerId.slice(0, 10),
      appServiceUserId: viewerId,
    };
  });

  return (
    <UserList
      title="Already shared with"
      users={users}
      handleUserSelect={handleUserSelect}
      isShared
      isLoading={isLoading}
    />
  );
};

export default AlreadySharedUserList;

