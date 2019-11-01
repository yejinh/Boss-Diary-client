import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import MainTab from './MainTabNavigator';

const SettingsStack = createStackNavigator ({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  }
});

const mainDrawer = createDrawerNavigator({
  Main: MainTab,
  Settings: SettingsStack
});

const AppNavigator = createSwitchNavigator(
  {
    Loading: {
      screen: LoadingScreen
    },
    Login: {
      screen: LoginScreen
    },
    App: {
      screen: mainDrawer
    }
  },
  {
    initialRouteName: 'Loading'
  }
);

export default createAppContainer(AppNavigator);
