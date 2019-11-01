import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';

const SettingsStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: 'Home',
      },
    }
  },
  {
    initialRouteName: 'Home'
  }
);

export default SettingsStack;
