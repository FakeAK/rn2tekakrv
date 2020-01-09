import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <Provider store={Store}>
      <MainNavigator />
    </Provider>
  );
}
