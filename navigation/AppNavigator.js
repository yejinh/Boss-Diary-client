import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoadingScreen from '../screens/LoadingScreen';
import MainTabNavigator from './MainTabNavigator';

const AppNavigator = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Loading: LoadingScreen,
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'Loading'
  }
);

export default createAppContainer(AppNavigator);
