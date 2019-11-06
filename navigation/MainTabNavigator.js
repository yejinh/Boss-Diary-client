import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import BurgerMenu from '../components/BurgerMenu';
import TabBarIcon from '../components/TabBarIcon';

// reports
import ReportsScreen from '../screens/ReportsScreen';

// new report
import NewReportScreen from '../screens/NewReportScreen';
import NewReportInputScreen from '../screens/NewReportInputScreen';
import NewReportPreviewScreen from '../screens/NewReportPriviewScreen';

// templates
import TemplatesScreen from '../screens/TemplatesScreen';
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
      screen: NewReportScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '보고서 작성',
        headerBackTitle: ' ',
        headerLeft: () => <BurgerMenu nav = {navigation} />
      })
    },
    NewReportInput: {
      screen: NewReportInputScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: `${navigation.state.params.template.name} 작성`,
        headerBackTitle: ' '
      })
    },
    NewReportPreview: {
      screen: NewReportPreviewScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '미리보기'
      })
    }
  }
);

const TemplatesStack = createStackNavigator(
  {
    Templates: {
      screen: TemplatesScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '템플릿 구매',
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
}, { initialRouteName: 'ReportsStack'});

export default MainTab;
