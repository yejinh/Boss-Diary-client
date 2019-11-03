import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MyPageScreen from '../screens/MyPageScreen';

const MyPageStack = createStackNavigator(
  {
    MyPage: {
      screen: MyPageScreen,
      navigationOptions: {
        headerTitle: '활동 내역'
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
    }
  },
  {
    initialRouteName: 'MyPage'
  }
);

export default MyPageStack;
