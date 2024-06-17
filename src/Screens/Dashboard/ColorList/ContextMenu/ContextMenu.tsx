import React from "react";
import Modalbox from "react-native-modalbox";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ListItem, Spacer, useTheme } from "@react-native-material/core";

import { animationDuration } from "../consts";

import { IProps } from "./types";

const ContextMenu = ({ contextItemId, hideContext, showShareItemDialog, showConfirmDeleteItem }: IProps) => {
  const { palette } = useTheme();

  return (
    <Modalbox
      coverScreen
      isOpen={!!contextItemId}
      style={{
        height: 200,
      }}
      onClosed={hideContext}
      position="bottom"
      animationDuration={animationDuration}
    >
      <Spacer mb={26}>
        <ListItem
          onPress={showShareItemDialog}
          title="Share"
          pressEffect="ripple"
          trailing={<Icon name="share" size={20} color={palette.primary.main} />}
        />
        <ListItem
          onPress={showConfirmDeleteItem}
          title="Delete item"
          pressEffect="ripple"
          trailing={<Icon name="delete-outline" size={20} color={palette.error.main} />}
        />
      </Spacer>
    </Modalbox>
  );
};

export default ContextMenu;
