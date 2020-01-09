import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import TabBarIcon from '../components/common/tabBar/TabBarIcon';
import { COLORS } from '../common/const';

const HOME_ICON = require('../../assets/tabBar/home.png');
const PROFILE_ICON = require('../../assets/tabBar/profile.png');

const iconsTabBar = {
  HOME: HOME_ICON,
  PROFILE: PROFILE_ICON,
};

export const TabBarNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  Profile: ProfileNavigator,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let icon;
      switch (routeName) {
        case 'Home':
          icon = iconsTabBar.HOME;
          break;
        case 'Profile':
          icon = iconsTabBar.PROFILE;
          break;
        default:
          break;
      }

      return <TabBarIcon focused={focused} icon={icon} />;
    },
  }),
  tabBarOptions: {
    showLabel: false,
    lazy: true,
    style: {
      backgroundColor: '#000',
      tintColor: COLORS.PRIMARY_COLOR,
    },
  },
});

export default createAppContainer(TabBarNavigator);
