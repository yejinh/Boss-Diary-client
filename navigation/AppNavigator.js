import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation';

import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import MainTab from './MainTabNavigator';
import RequestsScreen from '../screens/RequestsScreen';
import MyPageStack from './MyPageStackNavigator';

const mainDrawer = createDrawerNavigator(
  {
    Main: {
      screen: MainTab,
      navigationOptions: {
        drawerLabel: '메인 페이지'
      }
    },
    Requests: {
      screen: RequestsScreen,
      navigationOptions: {
        drawerLabel: '승인 요청'
      }
    },
    Settings: {
      screen: MyPageStack,
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
