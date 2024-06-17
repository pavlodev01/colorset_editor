import { Flex, Text, useTheme, VStack } from "@react-native-material/core";
import Slider from "@react-native-community/slider";
import React from "react";

import { IProps } from "./types";

const colorNames = ["Red", "Green", "Blue"];

const ColorEditor = ({ color, handleColorValueChange }: IProps) => {
  const theme = useTheme();
  const colors = [color.r, color.g, color.b];
  return (
    <VStack>
      {colors.map((colorValue, colorIndex) => (
        <Flex key={colorIndex} mh={24} mv={16}>
          <Flex mb={4}>
            <Text
              color={theme.palette.primary.main}
            >
              {colorNames[colorIndex]}
            </Text>
          </Flex>
          <Slider
            minimumValue={0}
            maximumValue={255}
            step={1}
            value={colorValue}
            onValueChange={(newValue) => handleColorValueChange(colorIndex, newValue)}
            minimumTrackTintColor={`rgba(${colorIndex === 0 ? colorValue : 0}, ${colorIndex === 1 ? colorValue : 0}, ${colorIndex === 2 ? colorValue : 0}, ${colorValue / 255})`}
            maximumTrackTintColor={theme.palette.secondary.main}
          />
        </Flex>
      ))}
    </VStack>
  );
};

export default ColorEditor;
