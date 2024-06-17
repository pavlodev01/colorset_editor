import React, { useState } from "react";
import { IconButton, Text, Flex, useTheme } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native";

import { useRealm } from "../../../RealmProviders";

import { TColorsetViewerNavigation } from "../types";

import { IProps } from "./types";

const ColorsetViewerHeader = ({ colorset, isEditor }: IProps) => {
  const realm = useRealm();
  const navigation = useNavigation<TColorsetViewerNavigation>();
  const theme = useTheme();

  const [renamedName, setRenamedName] = useState(colorset?.name || "");
  const [isRenaming, setIsRenaming] = useState(false);

  const handleStartRenaming = () => {
    if (!colorset) return;
    setRenamedName(colorset.name);
    setIsRenaming(true);
  };
  const handleSaveName = () => {
    if (!colorset) return;
    setIsRenaming(false);
    realm.write(() => {
      colorset.name = renamedName;
    });
  };

  if (isRenaming) {
    return (
      <Flex ph={8} direction="row" items="center" justify="between">
        <Flex fill ml={16}>
          <TextInput
            value={renamedName}
            onChangeText={setRenamedName}
            autoFocus
            onSubmitEditing={handleSaveName}
            style={{ fontSize: 20, color: theme.palette.primary.main, fontWeight: "500" }}
          />
        </Flex>
        <IconButton
          onPress={handleSaveName}
          pressEffect="ripple"
          icon={() => <Icon name="check" size={24} color={theme.palette.success.main} />}
        />
        <IconButton
          onPress={() => setIsRenaming(false)}
          pressEffect="ripple"
          icon={() => <Icon name="close" size={24} color={theme.palette.error.main} />}
        />
      </Flex>
    );
  }


  return (
    <Flex ph={8} direction="row" items="center" justify="between">
      <IconButton
        onPress={navigation.goBack}
        pressEffect="ripple"
        icon={() => <Icon name="close" size={24} color={theme.palette.primary.main} />}
      />
      <Flex fill>
        <Text variant="h6" color={theme.palette.primary.main}>
          {colorset?.name}
        </Text>
      </Flex>
      {isEditor && (
        <IconButton
          onPress={handleStartRenaming}
          pressEffect="ripple"
          icon={() => <Icon name="edit" size={24} color={theme.palette.primary.main} />}
        />
      )}
    </Flex>
  );
};

export default ColorsetViewerHeader;
