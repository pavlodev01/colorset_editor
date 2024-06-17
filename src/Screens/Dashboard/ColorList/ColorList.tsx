import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Flex } from "@react-native-material/core";
import { useUser } from "@realm/react";

import { useQuery, useRealm } from "../../../RealmProviders";
import { IColorset } from "../../../types/colorset";

import ColorListItem from "./ColorListItem";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog/ConfirmDeleteDialog";
import ShareItemDialog from "./ShareItemDialog";
import ContextMenu from "./ContextMenu";

import { IProps } from "./types";
import { animationDuration, modalSwapDuration } from "./consts";

const ColorList = ({ isShared }: IProps) => {
  const userId = useUser()?.id;
  const fullList = useQuery<IColorset>("Colorsets");
  const filteredList = fullList.filtered(
    isShared ? `owner_id != "${userId}"` : `owner_id = "${userId}"`
  );
  const realm = useRealm();
  const insets = useSafeAreaInsets();
  const [deletingItemId, setDeletingItemId] = useState<Realm.BSON.ObjectId | null>(null);
  const [contextItemId, setContextItemId] = useState<Realm.BSON.ObjectId | null>(null);
  const [sharingItemId, setSharingItemId] = useState<Realm.BSON.ObjectId | null>(null);

  const showContext = (itemId: Realm.BSON.ObjectId) => {
    if (!isShared) {
      setContextItemId(itemId);
    }
  };

  const hideContext = () => {
    setContextItemId(null);
  };

  const showConfirmDeleteItem = () => {
    setDeletingItemId(contextItemId);
    hideContext();
  };

  const hideConfirmDeleteItem = () => {
    setDeletingItemId(null);
  };

  const showShareItemDialog = () => {
    const newSharingItemId = contextItemId;
    hideContext();
    setTimeout(() => {
      setSharingItemId(newSharingItemId);
    }, animationDuration + modalSwapDuration);
  };

  const hideShareItemDialog = () => {
    setSharingItemId(null);
  };

  const handleDeleteItem = () => {
    if (deletingItemId) {
      const itemToDelete = filteredList.find((item) => item._id.equals(deletingItemId));
      if (itemToDelete) {
        realm.write(() => {
          realm.delete(itemToDelete);
        });
      }
    }
    hideConfirmDeleteItem();
  };

  useEffect(() => {
    realm.subscriptions.update((mutableSubscriptions) => {
      mutableSubscriptions.add(realm.objects("Colorsets"));
    });
  }, []);

  return (
    <Flex fill>
      <FlatList
        data={filteredList}
        renderItem={(item) => <ColorListItem item={item.item} showContext={showContext} />}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        bounces={false}
      />
      <ContextMenu
        contextItemId={contextItemId}
        hideContext={hideContext}
        showConfirmDeleteItem={showConfirmDeleteItem}
        showShareItemDialog={showShareItemDialog}
      />
      <ConfirmDeleteDialog
        visible={!!deletingItemId}
        onDismiss={hideConfirmDeleteItem}
        onSubmit={handleDeleteItem}
      />
      <ShareItemDialog
        sharingItemId={sharingItemId}
        visible={!!sharingItemId}
        onDismiss={hideShareItemDialog}
      />
    </Flex>
  );
};

export default ColorList;
