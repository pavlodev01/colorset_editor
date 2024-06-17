import "react-native-get-random-values";
import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as MaterialProvider, useTheme } from "@react-native-material/core";
import { Platform, UIManager } from "react-native";

import Navigator from "./Navigator";
import RealmProviders from "./RealmProviders";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  const originalTheme = useTheme();
  const theme = {
    ...originalTheme,
    palette: {
      ...originalTheme.palette,
      primary: {
        main: "#888",
        on: "#888",
      },
      secondary: {
        main: "#C3C3C3",
        on: "#C3C3C3",
      },
      success: {
        main: "#29c462",
        on: "#29c462",
      },
    },
  };

  return (
    <MaterialProvider theme={theme}>
      <SafeAreaProvider style={{ backgroundColor: "white" }}>
        <RealmProviders>
          <Navigator />
        </RealmProviders>
      </SafeAreaProvider>
    </MaterialProvider>
  );
};

export default App;
