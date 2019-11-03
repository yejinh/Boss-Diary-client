import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import BurgerMenu from '../components/BurgerMenu';

import TabBarIcon from '../components/TabBarIcon';
import ReportsScreen from '../screens/ReportsScreen';
import LinksScreen from '../screens/LinksScreen';
import TemplateScreen from '../screens/TemplateScreen';
import TemplateDetailScreen from '../screens/TemplateDetailScreen';

const ReportsStack = createStackNavigator(
  {
    Reports: {
      screen: ReportsScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '보고서 보관함',
        headerLeft: () => <BurgerMenu nav = {navigation} />
      })
    }
  }
);

const NewReportStack = createStackNavigator(
  {
    NewReport: {
      screen: LinksScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '보고서 작성하기',
        headerLeft: () => <BurgerMenu nav = {navigation} />
      })
    }
  }
);

const TemplatesStack = createStackNavigator(
  {
    Templates: {
      screen: TemplateScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '템플릿 구매하기',
        headerBackTitle: ' ',
        headerLeft: () => <BurgerMenu nav = {navigation} />
      })
    },
    TemplateDetail: {
      screen: TemplateDetailScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.template.name
      })
    }
  },
  {
    mode: 'modal',
    initialRouteName: 'Templates'
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
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-create'
    />
  )
};

TemplatesStack.navigationOptions = {
  tabBarLabel: '드림 디포',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-add-circle${focused ? '' : '-outline'}`}
    />
  )
};

const MainTab = createBottomTabNavigator({
  ReportsStack,
  NewReportStack,
  TemplatesStack
}, { initialRouteName: 'TemplatesStack' });

export default MainTab;
