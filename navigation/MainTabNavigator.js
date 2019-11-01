import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ReportsScreen from '../screens/ReportsScreen';
import LinksScreen from '../screens/LinksScreen';
import TemplateScreen from '../screens/SettingsScreen';

const ReportsStack = createStackNavigator(
  {
    Reports: {
      screen: ReportsScreen
    }
  }
);

ReportsStack.navigationOptions = {
  tabBarLabel: '보고서',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-folder${focused ? '-open' : ''}`}
    />
  )
};

const NewReportStack = createStackNavigator(
  {
    NewReport: {
      screen: LinksScreen
    }
  }
);

NewReportStack.navigationOptions = {
  tabBarLabel: '작성하기',
  tabBarIcon: () => (
    <TabBarIcon name={'ios-paper'} />
  )
};

const TemplatesStack = createStackNavigator(
  {
    Templates: {
      screen: TemplateScreen
    }
  }
);

TemplatesStack.navigationOptions = {
  tabBarLabel: '드림 디포',
  tabBarIcon: () => (
    <TabBarIcon name={'ios-add-circle-outline'} />
  )
};

const MainTab = createBottomTabNavigator({
  ReportsStack,
  NewReportStack,
  TemplatesStack
});

export default MainTab;
