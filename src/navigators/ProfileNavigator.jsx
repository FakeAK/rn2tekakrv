import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import ProfileView from '../components/Profile/ProfileView';
import { COLORS } from '../common/const';
import HeaderTitle from '../components/common/navigationBar/HeaderTitle';

const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: ProfileView,
    navigationOptions: () => ({
      headerBackTitle: 'Retour',
      headerStyle: {
        backgroundColor: COLORS.PRIMARY_COLOR,
      },
      headerTitle: () => <HeaderTitle />,
    }),
  },
});

export default ProfileNavigator;
