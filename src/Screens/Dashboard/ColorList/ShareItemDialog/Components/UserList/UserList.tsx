import { ActivityIndicator, Flex, ListItem, Stack, Text, useTheme } from "@react-native-material/core";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import { IProps } from "./types";

export const UserList = ({ title, users, handleUserSelect, isShared, isLoading, warning }: IProps) => {
  const theme = useTheme();
  const trailing = isShared
    ? <Icon name="check" size={24} color={theme.palette.success.main} />
    : undefined;

  return (
    <Stack mv={16}>
      <Text variant='caption'>{title}{warning && <Text variant='caption' color='error'> {warning}</Text>}</Text>
      <Stack mt={4}>
        {isLoading && (
          <Flex justify="center" mt={8}>
            <ActivityIndicator size={"small"} />
          </Flex>
        )}
        {!isLoading && users.map(user => (
          <ListItem
            key={user._id}
            title={user.username}
            onPress={() => handleUserSelect(user.appServiceUserId)}
            trailing={trailing}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default UserList;
