import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../../../common/const';

function TabBarIcon(props) {
  const { focused, icon } = props;

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

TabBarIcon.propTypes = {
  focused: PropTypes.bool,
  icon: PropTypes.number.isRequired,
};

TabBarIcon.defaultProps = {
  focused: false,
};

export default TabBarIcon;
