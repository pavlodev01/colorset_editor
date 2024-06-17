import React from "react";
import { Flex, Pressable, Spacer, Text } from "@react-native-material/core";
import { useTheme } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";

import { IProps, TDashboardNavigation } from "./types";
import { getColors } from "../../../../utils/getColors";

const ColorListItem = ({ item, showContext }: IProps) => {
  const colors = getColors(item.colors);
  const navigation = useNavigation<TDashboardNavigation>();
  const { palette } = useTheme();

  const onContextMenu = () => {
    showContext(item._id);
  };

  const onOpenColor = () => {
    navigation.navigate("ColorsetViewer", { id: item._id.toString() });
  };
  const listItemheight = 46;

  return (
    <Pressable pressEffect="ripple" onLongPress={onContextMenu} onPress={onOpenColor}>
      <Flex p={16} pv={8}>
        <Spacer mb={6}>
          <Text variant="body1">{item.name}</Text>
        </Spacer>
        <Flex
          fill
          direction="row"
          h={listItemheight}
          borderColor={!colors.length ? palette.secondary.main : undefined}
          style={{ borderRadius: 12, overflow: "hidden", borderWidth: !colors.length ? 1 : 0 }}
        >
          {colors.map(({ rgb }) => (
            <Spacer key={rgb} h={46} fill style={{ backgroundColor: rgb }} />
          ))}
        </Flex>
      </Flex>
    </Pressable>
  );
};

export default ColorListItem;
