import React from 'react';
import { Provider } from 'react-redux';
import Store from './src/redux/store';
import MainNavigator from './src/navigators/AuthNavigator';

export default function App() {
  return (
    <Provider store={Store}>
      <MainNavigator />
    </Provider>
  );
}
