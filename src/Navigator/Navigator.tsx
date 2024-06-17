import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../Screens/Dashboard";
import ColorsetViewer from "../Screens/ColorsetViewer";

export type NavigatorStackParamList = {
  Dashboard: undefined;
  ColorsetViewer: {
    id: string;
  };
};

const Stack = createStackNavigator<NavigatorStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ColorsetViewer"
          component={ColorsetViewer}
          options={{
            headerShown: false,
            presentation: "transparentModal",
            cardStyle: {
              backgroundColor: "white",
            },
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
