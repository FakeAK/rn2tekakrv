import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Store from './src/redux/store';
import MainNavigator from './src/navigators/AuthNavigator';
import TranslationHelper from './src/helpers/TranslationHelper';

export default function App() {
  useEffect(() => {
    TranslationHelper.setupI18n();
  });

  return (
    <Provider store={Store}>
      <MainNavigator />
    </Provider>
  );
}
