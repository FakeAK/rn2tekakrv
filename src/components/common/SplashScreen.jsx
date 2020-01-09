import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TokenHelper from '../../helpers/TokenHelper';
import { Tokens, ICONS } from '../../common/const';
import Request from '../../api/Request';
import { API } from '../../api/API';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

function SplashScreen(props) {
  const { navigate } = useNavigation();

  function setTokensInApp(tokens) {
    Tokens.ACCESS_TOKEN = tokens.accessToken;
    Tokens.REFRESH_TOKEN = tokens.refreshToken;
  }

  async function getNotificationsCount() {
    let notificationsCount = await Request
      .get()
      .to(API.NOTIFICATIONS.GET_NOTIFICATIONS_UNREAD_COUNT)
      .send();
    notificationsCount = notificationsCount.payload.count;
    const action = { type: 'NOTIFICATIONS_COUNT', notifications_count: notificationsCount };
    props.dispatch(action);
  }

  useEffect(() => {
    TokenHelper.getTokens().then((tokens) => {
      if (tokens.accessToken !== null) {
        setTokensInApp(tokens);
        getNotificationsCount();
        setTimeout(() => {
          navigate('Home');
        }, 2000);
      } else {
        setTimeout(() => {
          navigate('Login');
        }, 2000);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={ICONS.SPLASH} style={styles.image} />
    </View>
  );
}

SplashScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SplashScreen);
