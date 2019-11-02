import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';

const SettingsStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: '마이 페이지',
      },
    }
  },
  {
    initialRouteName: 'Home'
  }
);

export default SettingsStack;
