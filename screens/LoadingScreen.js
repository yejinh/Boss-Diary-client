import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

export default function LoadingScreen(props) {
  const [ isReady, setIsReady ] = useState(false);
  const { navigation } = props;
  const { fetchUserData } = props.screenProps;

  async function loadResourcesAsync() {
    try {
      await Promise.all([
        Font.loadAsync({
          'myeongjo': require('../assets/fonts/JejuMyeongjo.ttf'),
          'batang': require('../assets/fonts/IropkeBatangM.ttf'),
          'euljiro': require('../assets/fonts/BMEULJIRO.otf'),
          'yeonsung': require('../assets/fonts/BMYEONSUNG_otf.otf'),
          ...Ionicons.font,
        }),
        Permissions.askAsync(
          Permissions.CAMERA,
          Permissions.CALENDAR
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
          await fetchUserData();

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
