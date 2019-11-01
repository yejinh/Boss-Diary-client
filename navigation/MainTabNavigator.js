import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: '보고서',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-folder${focused ? '-open' : ''}`}
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: '작성하기',
  tabBarIcon: () => (
    <TabBarIcon name={'ios-paper'} />
  ),
};

LinksStack.path = '';

const TemplatesStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

TemplatesStack.navigationOptions = {
  tabBarLabel: '템플릿 추가',
  tabBarIcon: () => (
    <TabBarIcon name={'ios-add-circle-outline'} />
  ),
};

TemplatesStack.path = '';

const SettingsStack = createStackNavigator (
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: '마이 페이지',
  tabBarIcon: () => (
    <TabBarIcon name={'ios-contact'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  TemplatesStack,
  SettingsStack
});

tabNavigator.path = '';

export default tabNavigator;
