import React from 'react';
import { createStackNavigator } from 'react-navigation';
import BurgerMenu from '../components/BurgerMenu';
import MyPageScreen from '../screens/MyPageScreen';

const MyPageStack = createStackNavigator(
  {
    MyPage: {
      screen: MyPageScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '활동 내역',
        headerLeft: () => <BurgerMenu nav = {navigation} />
      })
      // header: props => {
      //   return (
      //     <View
      //       style={{
      //         height: 50,
      //         alignContent: 'center',
      //         alignItems: 'center',
      //         marginTop: 50
      //       }}>
      //       <Text>{props.screenProps.userData.name}</Text>
      //     </View>
      //   );
      // }
    }
  },
  {
    initialRouteName: 'MyPage'
  }
);

export default MyPageStack;
