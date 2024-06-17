import React from "react";
import { Flex, Pressable, Badge } from "@react-native-material/core";
import { IProps } from "./types";
import { Spacer } from "@react-native-material/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const height = 64;

const ColorSelector = ({ colors, handleChangeColorIndex, selectedColorIndex }: IProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Flex direction="row" justify="end">
      {colors.map(({ rgb }, index) => (
        <Spacer fill h={height + insets.bottom} key={index}>
          <Pressable
            style={{
              backgroundColor: rgb,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: insets.bottom / 2,
            }}
            onPress={() => handleChangeColorIndex(index)}
          >
            {index === selectedColorIndex && (
              <Badge color="white" style={{ borderWidth: 1, borderColor: "grey" }} />
            )}
          </Pressable>
        </Spacer>
      ))}
    </Flex>
  );
};

export default ColorSelector;
