import { KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import {
  TextInput,
  VStack,
  Wrap,
  Snackbar,
  useBoolean,
} from "@react-native-material/core";
import { useApp } from "@realm/react";

import Button from "../../Components/Button";
import {
  APP_SERVICE_APP_ID,
  APP_SERVICE_ENDPOINT_BASE_URL,
} from "../../config";

import styles from "./styles";

const Login = () => {
  const [username, setUsername] = useState("");
  const [isRegister, setIsRegister] = useBoolean();
  const [authError, setAuthError] = useState(false);
  const app = useApp();

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await axios.post(
          `${APP_SERVICE_ENDPOINT_BASE_URL}/app/${APP_SERVICE_APP_ID}/endpoint/registerUser`,
          {
            username,
          }
        );
      }

      const credentials = Realm.Credentials.function({
        username,
      });

      await app.logIn(credentials);
    } catch (error) {
      console.log(error);
      setAuthError(true);
    }
  };

  const disabled = !username;

  return (
    <KeyboardAvoidingView style={styles.flexStyle} behavior="padding">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.flexStyle}
        contentContainerStyle={styles.flexStyle}
      >
        <VStack spacing={16} justify="center" style={styles.flexStyle} p={16}>
          <Wrap spacing={4} justify="center">
            <Button
              variant={isRegister ? "contained" : "text"}
              title={"Register"}
              onPress={setIsRegister.on}
              compact={false}
            />
            <Button
              variant={!isRegister ? "contained" : "text"}
              title={"Login"}
              onPress={setIsRegister.off}
              compact={false}
            />
          </Wrap>
          <TextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            label="Username"
            variant="outlined"
            onSubmitEditing={handleSubmit}
            inputStyle={{
              padding: 0,
            }}
          />
          <Button
            onPress={handleSubmit}
            disabled={disabled}
            title={"submit"}
            contentContainerStyle={styles.buttonContainer}
            variant={disabled ? "outlined" : "contained"}
          />
        </VStack>
      </ScrollView>
      {authError && (
        <Snackbar
          message="Authentication error."
          action={
            <Button
              onPress={() => setAuthError(false)}
              variant="text"
              title="Dismiss"
              color="secondary"
            />
          }
          style={styles.snackBar}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default Login;
