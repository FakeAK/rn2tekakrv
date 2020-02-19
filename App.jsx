import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import Store from './src/redux/store';
import MainNavigator from './src/navigators/AuthNavigator';
import TranslationHelper from './src/helpers/TranslationHelper';

export default function App() {
  useEffect(() => {
    TranslationHelper.setupI18n();
    Sentry.init({
      dsn: 'https://d453d10312fd4f9599a66b8b717e003e@sentry.io/2676645',
      enableInExpoDevelopment: true,
      debug: true,
    });
    Sentry.setRelease(Constants.manifest.revisionId);
  });

  return (
    <Provider store={Store}>
      <MainNavigator />
    </Provider>
  );
}
