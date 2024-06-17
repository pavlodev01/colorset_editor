import React, { PropsWithChildren } from "react";
import { Flex } from "react-native-flex-layout";
import { ActivityIndicator } from "@react-native-material/core";
import { AppProvider, UserProvider, createRealmContext } from "@realm/react";

import Login from "../Screens/Login";
import { ColorsetsSchema } from "../schemas";
import { APP_SERVICE_APP_ID } from "../config";

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [ColorsetsSchema],
    schemaVersion: 1,
  });

const Loader = () => (
  <Flex fill justify="center">
    <ActivityIndicator size={"large"} />
  </Flex>
);

const RealmProviders = ({ children }: PropsWithChildren) => (
  <AppProvider id={APP_SERVICE_APP_ID}>
    <UserProvider fallback={Login}>
      <RealmProvider
        fallback={<Loader />}
        sync={{
          flexible: true,
        }}
      >
        {children}
      </RealmProvider>
    </UserProvider>
  </AppProvider>
);

export default RealmProviders;
