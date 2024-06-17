import { useUser } from "@realm/react";
import React from "react";

import { useObject } from "../../../../../RealmProviders";
import { IColorset } from "../../../../../types/colorset";

import UserList from "../Components/UserList";

import { IProps } from "./types";

const SearchList = ({ handleUserSelect, searchUserList, itemId, isLoading, isLimitReached }: IProps) => {
  const colorSet = useObject<IColorset>("Colorsets", itemId);
  const alreadySharedUserIds = [...(colorSet?.viewers || [])];
  const userId = useUser()?.id;

  const sharableUsers = searchUserList.filter(
    (user) =>
      !alreadySharedUserIds.includes(user.appServiceUserId) &&
      user.appServiceUserId !== userId
  );

  if (sharableUsers.length === 0 && !isLoading) {
    return null;
  }

  return (
    <UserList
      isLoading={isLoading}
      warning={isLimitReached ? "(share limit reached)" : undefined}
      title="Search Result"
      users={sharableUsers}
      handleUserSelect={handleUserSelect}
    />
  );
};

export default SearchList;
