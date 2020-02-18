import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SplashScreen from '../components/common/SplashScreen';
import LoginView from '../components/Auth/LoginView';
import RegisterView from '../components/Auth/RegisterView';
import MainNavigator from './TabBarNavigator';
import { COLORS } from '../common/const';

const AuthNavigator = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: LoginView,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register: {
    screen: RegisterView,
    navigationOptions: {
      headerTintColor: '#000',
      headerTitle: '',
      headerStyle: {
        backgroundColor: COLORS.PRIMARY_COLOR,
      },
    },
  },
  Home: {
    screen: MainNavigator,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },
  },
});

export default createAppContainer(AuthNavigator);
