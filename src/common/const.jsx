import {
  Platform,
  NativeModules,
  Dimensions,
} from 'react-native';

const bellImage = require('../../assets/navigationBar/bell.png');
const logo = require('../../assets/navigationBar/logo.png');
const backIcon = require('../../assets/navigation/back.png');
const chainIcon = require('../../assets/navigation/chain.png');
const logout = require('../../assets/navigationBar/logout.png');

const { StatusBarManager } = NativeModules;

export const Tokens = {
  ACCESS_TOKEN: null,
};

export const OSTYPE = {
  IOS: 'ios',
  ANDROID: 'android',
};

export const OS = (Platform.OS === OSTYPE.IOS ? OSTYPE.IOS : OSTYPE.ANDROID);
export const IS_IOS = Platform.OS === OSTYPE.IOS;

export const COLORS = {
  PRIMARY_COLOR: '#FECB30',
  BLACK: '#000',
  LIGHT_GRAY: '#DDE2E3',
  BACKGROUND_COLOR: '#F0F0F0',
  GREEN_LIGHT: '#00B254',
};

export const IconsButtonNavigationBar = {
  NOTIFICATIONS: bellImage,
  LOGOUT: logout,
};

export const ICONS = {
  LOGO: logo,
  BACK_ICON: backIcon,
  CHAIN: chainIcon,
  LOGOUT: logout,
};

export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
