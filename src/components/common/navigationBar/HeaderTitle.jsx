import React from 'react';
import { View, Image } from 'react-native';
import { ICONS } from '../../../common/const';

export default function HeaderTitle() {
  return (
    <View style={{ flex: 1 }}>
      <Image source={ICONS.LOGO} style={{ width: 50, alignSelf: 'center', height: 50 }} resizeMode="contain" />
    </View>
  );
}
