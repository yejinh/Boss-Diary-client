import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';

import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import MainTab from './MainTabNavigator';
import RequestsScreen from '../screens/RequestsScreen';
import MyPageScreen from '../screens/MyPageScreen';
import BurgerMenu from '../components/BurgerMenu';

const mainDrawer = createDrawerNavigator(
  {
    Main: {
      screen: MainTab,
      navigationOptions: {
        drawerLabel: '메인 페이지'
      }
    },
    Requests: {
      screen: createStackNavigator({
        Requests: {
          screen: RequestsScreen,
          navigationOptions: ({ navigation }) => ({
            headerTitle: '승인 요청',
            headerLeft: () => <BurgerMenu nav = {navigation} />
          })
        }
      }),
      navigationOptions: {
        drawerLabel: '승인 요청'
      }
    },
    Settings: {
      screen: createStackNavigator({
        MyPage: {
          screen: MyPageScreen,
          navigationOptions: ({ navigation }) => ({
            headerTitle: '활동 내역',
            headerLeft: () => <BurgerMenu nav = {navigation} />
          })
        }
      }),
      navigationOptions: {
        drawerLabel: '나의 페이지'
      }
    }
  },
  {
    initialRouteName: 'Main'
  }
);

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
