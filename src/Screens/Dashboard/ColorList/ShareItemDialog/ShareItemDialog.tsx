import React, { useEffect, useState } from "react";
import {
  Stack,
  DialogHeader,
  DialogContent,
  DialogActions,
  TextInput,
  Surface,
  Snackbar,
} from "@react-native-material/core";
import axios from "axios";
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Platform,
  LayoutAnimation,
} from "react-native";

import Button from "../../../../Components/Button";
import { useRealm } from "../../../../RealmProviders";
import { IColorset } from "../../../../types/colorset";
import { APP_SERVICE_APP_ID, APP_SERVICE_ENDPOINT_BASE_URL } from '../../../../config';

import AlreadySharedUserList from "./AlreadySharedUserList";
import SearchList from "./SearchList";

import { IApiUser, IProps } from "./types";
import styles from "./styles";

const listAppearAnimationConfig = {
  ...LayoutAnimation.Presets.easeInEaseOut,
  duration: 100,
};

const ShareItemDialog = ({ sharingItemId, visible, onDismiss }: IProps) => {
  const [searchText, setSearchText] = useState("");
  const [searchUserList, setSearchUserList] = useState<IApiUser[]>([]);
  const [isSearchUserListLoading, setIsSearchUserListLoading] = useState(false);
  const realm = useRealm();
  const [contactList, setContactList] = useState<IApiUser[]>([]);
  const [isContactListLoading, setIsContactListLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const colorSet = sharingItemId ? realm.objects<IColorset>("Colorsets")
    .filtered(`_id = oid(${sharingItemId})`)[0] : undefined;

  const handleShowError = (message?: string) => {
    setSnackMessage(message || "Unexpected error happened during search.");
    setTimeout(() => {
      setSnackMessage("");
    }, 3000);
  };

  const searchFromAPI = async () => {
    try {
      LayoutAnimation.configureNext(listAppearAnimationConfig);
      setIsSearchUserListLoading(true);
      const res = await axios.get<IApiUser[]>(`${APP_SERVICE_ENDPOINT_BASE_URL}/app/${APP_SERVICE_APP_ID}/endpoint/searchUsernames?search=${searchText}`);
      setTimeout(() => {
        LayoutAnimation.configureNext(listAppearAnimationConfig);
        setSearchUserList(res.data);
        if (res.data.length === 0) {
          handleShowError("Can't find any user. Please search for something else.");
        }
      });
    } catch {
      handleShowError();
    } finally {
      setIsSearchUserListLoading(false);
    }
  };

  const clearList = () => {
    LayoutAnimation.configureNext(listAppearAnimationConfig);
    setSearchUserList([]);
  };

  const handleUserSelect = (userId: string) => {
    realm.write(() => {
      if (!contactList.find(u => u.appServiceUserId === userId)) {
        const addedUser = searchUserList.find(u => u.appServiceUserId === userId);
        if (addedUser) {
          setContactList(oldList => [...oldList, addedUser]);
        }
      }
      if (colorSet) {
        if (colorSet.viewers) {
          const viewers = [...colorSet.viewers];
          if (viewers.includes(userId)) {
            colorSet.viewers = viewers.filter(viewerId => viewerId !== userId);
          } else {
            if (viewers.length < 4) {
              colorSet.viewers = [...viewers, userId];
            }
          }
        } else {
          colorSet.viewers = [userId];
        }
      } else {
        handleShowError();
      }
    });
  };

  useEffect(() => {
    setSearchText("");
  }, [visible]);


  const getSharedUsernames = async () => {
    try {
      setIsContactListLoading(true);
      const res = await axios.get(`${APP_SERVICE_ENDPOINT_BASE_URL}/app/${APP_SERVICE_APP_ID}/endpoint/getUsernames?colorsetId=${sharingItemId}`);
      setTimeout(() => {
        LayoutAnimation.configureNext(listAppearAnimationConfig);
        setContactList(res.data);
      });
    } catch (error) {
      handleShowError();
    } finally {
      setIsContactListLoading(false);
    }
  };
  useEffect(() => {
    if (sharingItemId) {
      getSharedUsernames();
    }
  }, [sharingItemId]);

  return (
    <Modal visible={visible} transparent animationType="fade" >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={[StyleSheet.absoluteFill, styles.backdrop]} />
      </TouchableWithoutFeedback>
      <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: "padding", android: "height" })}
          keyboardVerticalOffset={160}
        >
          <Surface category="medium" elevation={24} style={styles.dialog}>
            <DialogHeader title="Share color set" />
            <DialogContent>
              <Stack spacing={2}>
                <TextInput
                  value={searchText}
                  onChangeText={setSearchText}
                  label="Username"
                  variant="outlined"
                  returnKeyType='search'
                  onSubmitEditing={searchFromAPI}
                  autoFocus
                  onFocus={clearList}
                  inputStyle={{
                    padding: 0,
                  }}
                />
                {sharingItemId && (
                  <AlreadySharedUserList
                    itemId={sharingItemId}
                    handleUserSelect={handleUserSelect}
                    contactList={contactList}
                    isLoading={isContactListLoading}
                  />
                )}
                {(searchUserList.length > 0 || isSearchUserListLoading) && sharingItemId && (
                  <SearchList
                    isLoading={isSearchUserListLoading}
                    itemId={sharingItemId}
                    handleUserSelect={handleUserSelect}
                    searchUserList={searchUserList}
                    isLimitReached={(colorSet?.viewers?.length || 0) >= 4}
                  />
                )}
              </Stack>
              {snackMessage && (
                <Snackbar
                  message={snackMessage}
                  style={{ marginTop: 8 }}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button
                title="Close"
                variant="text"
                color="primary"
                onPress={onDismiss}
              />
            </DialogActions>
          </Surface>
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
  );
};

export default ShareItemDialog;