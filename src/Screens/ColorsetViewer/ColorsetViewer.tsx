import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Flex } from "@react-native-material/core";
import { useRoute } from "@react-navigation/native";

import { useObject, useRealm } from "../../RealmProviders";
import { IColorset } from "../../types/colorset";
import { getColors } from "../../utils/getColors";
import { generateRandomColor } from "../../utils/generateRandomColor";

import ColorsetViewerHeader from "./ColorsetViewHeader/ColorsetViewerHeader";
import ColorSelector from "./ColorSelector";
import ColorDisplay from "./ColorDisplay";

import { TColorsetViewerRoute } from "./types";
import ColorEditor from "./ColorEditor";
import { useUser } from "@realm/react";

const ColorsetViewer = () => {
  const { id } = useRoute<TColorsetViewerRoute>().params;
  const realm = useRealm();
  const userId = useUser()?.id;
  const colorset = useObject<IColorset>("Colorsets", new Realm.BSON.ObjectId(id));
  const insets = useSafeAreaInsets();

  const colors = colorset ? getColors(colorset.colors) : [];

  const isEditor = colorset?.owner_id === userId;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const handleChangeColorIndex = (index: number) => {
    setSelectedColorIndex(index);
  };

  const handleRemoveColor = () => {
    if (!colorset) {
      return;
    }
    realm.write(() => {
      const newColors = colors.filter((_, index) => index !== selectedColorIndex);
      const newRawColors = newColors.map(color => [color.r, color.g, color.b]).reduce((all, color) => [...all, ...color]);
      colorset.colors = newRawColors;
      setSelectedColorIndex(Math.min(colorset.colors.length / 3 - 1, selectedColorIndex));
    });
  };

  const handleAddColor = () => {
    if (!colorset) {
      return;
    }
    realm.write(() => {
      const newColors = generateRandomColor();
      colorset.colors = [...colorset.colors, ...newColors];
      setSelectedColorIndex(colorset.colors.length / 3 - 1);
    });
  };

  const handleColorValueChange = (colorIndex: number, newColorValue: number) => {
    if (!colorset) {
      return;
    }
    realm.write(() => {
      const newColors =[...colorset.colors];
      newColors[selectedColorIndex * 3 + colorIndex] = newColorValue;
      colorset.colors = newColors;
    });
  };
  return (
    <Flex fill pt={insets.top}>
      <ColorsetViewerHeader colorset={colorset} isEditor={isEditor} />
      {!!colorset && <ColorDisplay
        totalColors={colors.length}
        handleRemoveColor={handleRemoveColor}
        handleAddColor={handleAddColor}
        color={colors[selectedColorIndex]}
        isEditor={isEditor}
      />}
      {isEditor && !!colorset && (
        <ColorEditor color={colors[selectedColorIndex]} handleColorValueChange={handleColorValueChange}/>
      )}
      {!!colorset && (
        <ColorSelector
          colors={colors}
          handleChangeColorIndex={handleChangeColorIndex}
          selectedColorIndex={selectedColorIndex}
        />
      )}
    </Flex>
  );
};

export default ColorsetViewer;
