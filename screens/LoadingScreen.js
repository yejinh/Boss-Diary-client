import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function LoadingScreen(props) {
  console.log('LoadingScreen', props);
  const { navigation } = props;

  async function loadResourcesAsync() {
    await Promise.all([
      Asset.loadAsync([
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  }

  function handleLoadingError(error) {
    console.warn(error);
  }

  function handleFinishLoading(setIsLoading) {
    setIsLoading(true);
  }

  function navigateLoginScreen() {
    navigation.navigate('Home');
  }

  return (
    <AppLoading
      startAsync={loadResourcesAsync}
      onError={handleLoadingError}
      onFinish={navigateLoginScreen}
    />
  );
}

export default LoadingScreen;
