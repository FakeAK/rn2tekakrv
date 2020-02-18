import { NavigationActions, StackActions } from 'react-navigation';
import TokenHelper from './TokenHelper';

export default function UserHelper() { }

UserHelper.logout = (navigation) => {
  TokenHelper.deleteTokens();
  navigation.dispatch(StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
  }));
};
