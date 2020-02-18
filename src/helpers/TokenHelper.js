import * as SecureStore from 'expo-secure-store';
import { Tokens } from '../common/const';

export default function TokenHelper() { }

TokenHelper.storeTokens = async (accessToken) => {
  Tokens.ACCESS_TOKEN = accessToken;
  SecureStore.setItemAsync('accessToken', accessToken);
};

TokenHelper.getTokens = async () => {
  const data = {};
  const accessToken = await SecureStore.getItemAsync('accessToken');

  data.accessToken = accessToken;
  return data;
};

TokenHelper.deleteTokens = () => {
  SecureStore.deleteItemAsync('accessToken');

  Tokens.ACCESS_TOKEN = null;
};
