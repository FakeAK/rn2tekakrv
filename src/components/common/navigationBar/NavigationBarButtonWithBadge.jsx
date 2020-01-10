import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    height: 25,
    width: 30,
    marginLeft: 15,
  },
  iconImage: {
    width: 25,
    height: 25,
  },
  badgeContainer: {
    backgroundColor: 'red',
    height: 18,
    width: 18,
    right: 0,
    top: 0,
    borderRadius: 18 / 2,
    position: 'absolute',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFF',
    alignSelf: 'center',
    marginLeft: 1,
    fontSize: 12,
  },
});

function NavigationBarButtonWithBadge(props) {
  const { icon, onPress, NotificationsReducer } = props;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
      <Image source={icon} style={styles.iconImage} />
      {
        NotificationsReducer.notifications_count > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>
              {
                NotificationsReducer.notifications_count < 10 ? NotificationsReducer.notifications_count : '+'
              }
            </Text>
          </View>
        )
      }
    </TouchableOpacity>
  );
}

NavigationBarButtonWithBadge.propTypes = {
  icon: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  NotificationsReducer: PropTypes.shape({
    notifications_count: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(NavigationBarButtonWithBadge);
