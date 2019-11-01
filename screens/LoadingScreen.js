import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';

export default function LoadingScreen(props) {
  const [ isReady, setIsReady ] = useState(false);
  const { navigation } = props;

  async function loadResourcesAsync() {
    await Font.loadAsync({
      ...Ionicons.font,
    });

    setIsReady(true);
  }

  function handleLoadingError(error) {
    console.warn(error);
  }

  async function navigateLoginScreen() {
    const token = await SecureStore.getItemAsync('ACCESS_TOKEN');

    if (isReady) {
      navigation.navigate(token ? 'App' : 'App');
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
