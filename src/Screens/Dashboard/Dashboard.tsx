import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme, HStack, IconButton, Flex, Wrap } from "@react-native-material/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "@realm/react";

import Button from "../../Components/Button";

import AddColorPopup from "./ColorList/AddColorPopup";
import ColorList from "./ColorList/ColorList";

const Dashboard = () => {
  const user = useUser();
  const [isShared, setIsShared] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const handleLogout = () => {
    user?.logOut();
  };

  const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Flex fill>
      <HStack mt={insets.top} ph={8} style={{ alignItems: "center" }}>
        <IconButton
          onPress={handleLogout}
          pressEffect="ripple"
          icon={() => <Icon name="logout" size={24} color={theme.palette.primary.main} />}
        />
        <Flex fill>
          <Wrap spacing={8} justify="center">
            <Button
              variant={!isShared ? "contained" : "text"}
              title={"My Sets"}
              onPress={() => setIsShared(false)}
            />
            <Button
              variant={isShared ? "contained" : "text"}
              title={"Shared"}
              onPress={() => setIsShared(true)}
            />
          </Wrap>
        </Flex>
        <Flex
          {...(isShared && {
            style: { opacity: 0 },
            pointerEvents: "none",
          })}
        >
          <IconButton
            icon={() => <Icon name="add" size={24} color={theme.palette.primary.main} />}
            onPress={() => setIsAddPopupOpen(true)}
            pressEffect="ripple"
          />
        </Flex>
      </HStack>
      <ColorList isShared={isShared} />
      <AddColorPopup
        visible={isAddPopupOpen}
        onDismiss={handleCloseAddPopup}
      />
    </Flex>
  );
};

export default Dashboard;
