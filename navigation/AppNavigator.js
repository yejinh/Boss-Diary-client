import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';

const AppNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Login: LoginScreen,
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'Loading'
  }
);

export default createAppContainer(AppNavigator);
