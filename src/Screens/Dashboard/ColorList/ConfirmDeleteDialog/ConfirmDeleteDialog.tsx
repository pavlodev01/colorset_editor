import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Text,
} from "@react-native-material/core";
import React from "react";
import Button from "../../../../Components/Button";
import { IProps } from "./types";

const ConfirmDeleteDialog = ({ visible, onDismiss, onSubmit }: IProps) => {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <DialogHeader title="Delete colorset" />
      <DialogContent>
        <Text>Are you sure you want to delete this color set?</Text>
      </DialogContent>
      <DialogActions>
        <Button
          title="Cancel"
          variant="text"
          color="secondary"
          onPress={onDismiss}
        />
        <Button
          title="Delete"
          variant="text"
          color="error"
          onPress={onSubmit}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
