import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation';

import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingStack from './SettingStackNavigator';
import MainTab from './MainTabNavigator';

const mainDrawer = createDrawerNavigator(
  {
    Main: {
      screen: MainTab,
      navigationOptions: {
        drawerLabel: 'Main'
      }
    },
    Settings: {
      screen: SettingStack,
      navigationOptions: {
        drawerLabel: 'Settings',
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
