import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function LoadingScreen(props) {
  const [ isReady, setIsReady ] = useState(false);
  const { navigation } = props;
  const { fetchUserData } = props.screenProps;

  async function loadResourcesAsync() {
    try {
      await Promise.all([
        Font.loadAsync({
          ...Ionicons.font,
        }),
        Permissions.askAsync(
          Permissions.CAMERA
        )
      ]);

      setIsReady(true);
    } catch(err) {
      Alert.alert('로딩 에러', err.message);
      console.log(err);
    }
  }

  function handleLoadingError(error) {
    Alert.alert('로딩 에러', err.message);
    console.warn(error);
  }

  async function navigateLoginScreen() {
    try {
      if (isReady) {
        const access_token = await SecureStore.getItemAsync('ACCESS_TOKEN');

        if (access_token) {
          fetchUserData();

          return navigation.navigate('App');
        }

        navigation.navigate('Login');
      }
    } catch(err) {
      Alert.alert('로딩 에러', err.message);
      console.log(err);
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
