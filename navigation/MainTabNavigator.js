import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ReportsScreen from '../screens/ReportsScreen';
import LinksScreen from '../screens/LinksScreen';
import TemplateScreen from '../screens/SettingsScreen';

const ReportsStack = createStackNavigator(
  { Reports: ReportsScreen }
);

ReportsStack.navigationOptions = {
  tabBarLabel: '보고서',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-folder${focused ? '-open' : ''}`}
    />
  ),
};

ReportsStack.path = '';

const NewReportStack = createStackNavigator(
  { Links: LinksScreen }
);

NewReportStack.navigationOptions = {
  tabBarLabel: '작성하기',
  tabBarIcon: () => (
    <TabBarIcon name={'ios-paper'} />
  ),
};

NewReportStack.path = '';

const TemplatesStack = createStackNavigator(
  { Settings: TemplateScreen }
);

TemplatesStack.navigationOptions = {
  tabBarLabel: '템플릿 추가',
  tabBarIcon: () => (
    <TabBarIcon name={'ios-add-circle-outline'} />
  ),
};

TemplatesStack.path = '';

const MainTab = createBottomTabNavigator({
  ReportsStack,
  NewReportStack,
  TemplatesStack
});

MainTab.path = '';

export default MainTab;
