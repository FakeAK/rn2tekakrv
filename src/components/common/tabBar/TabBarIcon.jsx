import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../../common/const';

export default function TabBarIcon(props) {
  const { focused, icon } = props;

  const styles = StyleSheet.create({
    iconImage: {
      width: 25,
      height: 25,
      alignSelf: 'center',
      marginTop: 3,
    },
    container: {
      justifyContent: 'center',
      height: '100%',
      flexDirection: 'column',
      borderBottomColor: focused ? COLORS.PRIMARY_COLOR : COLORS.BLACK,
      borderBottomWidth: 3,
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.iconImage} />
    </View>
  );
}
