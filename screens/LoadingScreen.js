import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function LoadingScreen(props) {
  const [ isReady, setIsReady ] = useState(false);
  const { navigation } = props;
  const { fetchUserData, userData } = props.screenProps;

  async function loadResourcesAsync() {
    await Promise.all([
      Font.loadAsync({
        ...Ionicons.font,
      }),
      Permissions.askAsync(
        Permissions.CAMERA
      )
    ]);

    setIsReady(true);
  }

  function handleLoadingError(error) {
    console.warn(error);
  }

  async function navigateLoginScreen() {
    if (isReady) {
      const access_token = await SecureStore.getItemAsync('ACCESS_TOKEN');

      if (access_token) {
        fetchUserData();

        return navigation.navigate('App');
      }

      navigation.navigate('Login');
    }
  }

  return (
    <AppLoading
      startAsync={loadResourcesAsync}
      onError={handleLoadingError}
      onFinish={navigateLoginScreen}
    />
  );
}
