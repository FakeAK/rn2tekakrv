import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import NavigationBarButtonWithBadge from '../components/common/navigationBar/NavigationBarButtonWithBadge';
import HomeView from '../components/Home/HomeView';
import TrainingView from '../components/Trainings/TrainingView';
import { COLORS, IconsButtonNavigationBar } from '../common/const';
import HeaderTitle from '../components/common/navigationBar/HeaderTitle';
import UserHelper from '../helpers/UserHelper';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeView,
    navigationOptions: ({ navigation }) => ({
      headerBackTitle: 'Retour',
      headerStyle: {
        backgroundColor: COLORS.PRIMARY_COLOR,
      },
      headerTitle: () => <HeaderTitle />,
      headerLeft: () => (
        <NavigationBarButtonWithBadge
          icon={IconsButtonNavigationBar.NOTIFICATIONS}
          onPress={() => navigation.navigate('Notifications')}
        />
      ),
      headerRight: () => (
        <NavigationBarButtonWithBadge
          icon={IconsButtonNavigationBar.LOGOUT}
          onPress={() => UserHelper.logout(navigation)}
        />
      ),
    }),
  },
  Training: {
    screen: TrainingView,
    navigationOptions: {
      headerBackTitle: 'Retour',
      headerTintColor: '#000',
      headerShown: false,
      headerStyle: {
        backgroundColor: COLORS.PRIMARY_COLOR,
      },
    },
  },
});

HomeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route) => {
      if (route.routeName === 'Login'
        || route.routeName === 'Training'
        || route.routeName === 'Event'
        || route.routeName === 'Store') {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }

      return route;
    });
  }

  return {
    tabBarVisible,
  };
};

export default HomeNavigator;
