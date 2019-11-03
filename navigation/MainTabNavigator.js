import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  HeaderBackButton
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ReportsScreen from '../screens/ReportsScreen';
import LinksScreen from '../screens/LinksScreen';
import TemplateScreen from '../screens/TemplateScreen';
import TemplateDetailScreen from '../screens/TemplateDetailScreen';

const ReportsStack = createStackNavigator(
  {
    Reports: {
      screen: ReportsScreen,
      navigationOptions: {
        headerTitle: '보고서 보관함'
      }
    }
  }
);

const NewReportStack = createStackNavigator(
  {
    NewReport: {
      screen: LinksScreen,
      navigationOptions: {
        headerTitle: '보고서 작성하기'
      }
    }
  }
);

const TemplatesStack = createStackNavigator(
  {
    Templates: {
      screen: TemplateScreen,
      navigationOptions: {
        headerTitle: '템플릿 구매하기',
        headerBackTitle: ' '
      }
    },
    TemplateDetail: {
      screen: TemplateDetailScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.template.name
      })
    }
  },
  {
    mode: 'modal'
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

NewReportStack.navigationOptions = {
  tabBarLabel: '작성하기',
  tabBarIcon: () => (
    <TabBarIcon name={'ios-paper'} />
  )
};

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
}, { initialRouteName: 'TemplatesStack' });

export default MainTab;
