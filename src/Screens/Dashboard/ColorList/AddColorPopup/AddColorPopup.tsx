import React, { useState } from "react";
import {
  Stack,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  TextInput,
} from "@react-native-material/core";
import { useUser } from '@realm/react';

import Button from "../../../../Components/Button";
import { useRealm } from "../../../../RealmProviders";
import { generateRandomColor } from '../../../../utils/generateRandomColor';

import { IAddColorPopupProps } from "./types";

const AddColorPopup = ({ visible, onDismiss }: IAddColorPopupProps) => {
  const [colorsetName, setColorsetName] = useState("");
  const realm = useRealm();
  const user = useUser();

  
  const handleAddColorset = () => {
    if (!colorsetName) {
      return;
    }
    const _id = new Realm.BSON.ObjectId();
    const ownerId = user?.id;
    realm.write(() => {
      realm.create("Colorsets", {
        _id,
        name: colorsetName,
        owner_id: ownerId,
        colors: generateRandomColor(),
        viewers: [],
      });
    });
    onDismiss();
  };

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <DialogHeader title="Add new colorset" />
      <DialogContent>
        <Stack spacing={2}>
          <TextInput
            label="Colorset name"
            variant="outlined"
            onChangeText={setColorsetName}
            autoFocus
            onSubmitEditing={handleAddColorset}
            inputStyle={{
              padding: 0,
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          title="Cancel"
          variant="text"
          onPress={onDismiss}
          color="secondary"
        />
        <Button
          title="Add"
          variant="text"
          onPress={handleAddColorset}
          color="primary"
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddColorPopup;
