import React, { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Flex,
  HStack,
  IconButton,
  Snackbar,
  Text,
  useTheme,
} from "@react-native-material/core";
import Clipboard from "@react-native-clipboard/clipboard";

import { IProps } from "./types";
import { getHexColor } from "./utils";
import { TouchableOpacity } from "react-native";

const MAXIMUM_COLORS = 5;

const ColorDisplay = ({
  color,
  isEditor,
  handleRemoveColor,
  handleAddColor,
  totalColors,
}: IProps) => {
  const theme = useTheme();
  const [isCopied, setIsCopied] = useState(false);
  const [copiedColor, setCopiedColor] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const hexColor = getHexColor(color);

  const handleCopyToClipboard = () => {
    Clipboard.setString(hexColor);
    setCopiedColor(hexColor);
    setIsCopied(true);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setIsCopied(false);
      timer.current = undefined;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <Flex fill style={{ backgroundColor: color.rgb }} p={16} justify="end">
      <HStack items="center" justify="between">
        <TouchableOpacity onPress={handleCopyToClipboard}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textShadowColor: "black",
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 3,
            }}
          >
            {hexColor}
          </Text>
        </TouchableOpacity>
        {isEditor && (
          <HStack spacing={16}>
            {totalColors > 1 && (
              <IconButton
                pressEffect="ripple"
                onPress={handleRemoveColor}
                contentContainerStyle={{ backgroundColor: "white" }}
                icon={() => (
                  <Icon
                    name="remove"
                    size={24}
                    color={theme.palette.primary.main}
                  />
                )}
              />
            )}
            {totalColors < MAXIMUM_COLORS && (
              <IconButton
                pressEffect="ripple"
                onPress={handleAddColor}
                contentContainerStyle={{ backgroundColor: "white" }}
                icon={() => (
                  <Icon
                    name="add"
                    size={24}
                    color={theme.palette.primary.main}
                  />
                )}
              />
            )}
          </HStack>
        )}
      </HStack>
      {isCopied && (
        <Snackbar
          message={`${copiedColor} was copied to clipboard!`}
          style={{ position: "absolute", start: 16, end: 16, top: 16 }}
        />
      )}
    </Flex>
  );
};

export default ColorDisplay;
