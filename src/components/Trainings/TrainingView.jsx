import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Share,
  Platform,
} from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import DropdownAlert from 'react-native-dropdownalert';
import PropTypes from 'prop-types';
import openMap from 'react-native-open-maps';
import MapView, { Marker } from 'react-native-maps';
import { API } from '../../api/API';
import TrainingDetails from './TrainingDetails';
import {
  COLORS,
  ICONS,
} from '../../common/const';
import Request from '../../api/Request';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  activityIndicator: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    position: 'absolute',
    left: 15,
    bottom: 20,
    right: 15,
    fontSize: 22,
    fontWeight: '700',
  },
  placeContainer: {
    backgroundColor: '#FFF',
    marginTop: 10,
  },
  placeInfos: {
    padding: 10,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 200,
  },
  imageFilter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    opacity: 0.1,
  },
  eventImage: {
    height: 300,
    width: '100%',
  },
  nbParticipantText: {
    marginLeft: 5,
  },
  description: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
  footer: {
    height: 50,
    backgroundColor: COLORS.PRIMARY_COLOR,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonFooterText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

function TrainingView(props) {
  const [trainingData, setTrainingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { navigation } = props;
  const { state } = navigation;
  const { params } = state;
  const { id } = params;
  const dropDownAlertRef = useRef();

  async function getTrainingDetails() {
    try {
      const res = await Request.get().to(API.TRAINING.DETAIL(id)).send();
      res.payload.training.distanceFromUser = res.payload.distanceFromUser;
      res.payload.training.url = res.payload.web_url;
      setTrainingData(new TrainingDetails(res.payload.training));
      setIsLoading(false);
    } catch (err) {
      dropDownAlertRef.alertWithType('error', '', 'Impossible de charger l\'entraînement.');
      setIsLoading(false);
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    }
  }

  useEffect(() => {
    StatusBar.setHidden(true);
    getTrainingDetails();
  }, []);

  function seeStartPosition() {
    openMap({
      query: trainingData.address,
      latitude: parseFloat(trainingData.latitude),
      longitude: parseFloat(trainingData.longitude),
    });
  }

  function goBackButtonPressed() {
    navigation.goBack();
  }

  async function shareButtonPressed(trainingURL) {
    await Share.share({
      message: null,
      url: trainingURL,
    });
  }

  if (isLoading) {
    return (
      <View>
        <Text>ça load</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View>
        <ScrollView
          alwaysBounceVertical={false}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Image style={styles.eventImage} source={{ uri: trainingData.photo }} />
            <View style={styles.imageFilter} />
            <View style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              top: 15,
            }}
            >
              <TouchableWithoutFeedback onPress={goBackButtonPressed} style={{ marginLeft: 10 }}>
                <Image source={ICONS.BACK_ICON} style={{ height: 25, width: 25 }} />
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => shareButtonPressed(trainingData.url)}
                style={{ marginRight: 10 }}
              >
                <Image source={ICONS.CHAIN} resizeMode="contain" style={{ height: 25, width: 25 }} />
              </TouchableWithoutFeedback>
            </View>
            <View>
              <Text numberOfLines={2} style={styles.title}>{trainingData.title}</Text>
            </View>
          </View>

          {
            trainingData.trainingOwner !== null
            && (
              <View style={{
                alignItems: 'center',
                backgroundColor: '#FFF',
                addingBottom: 10,
                justifyContent: 'center',
              }}
              >
                <Text style={{
                  color: COLORS.PRIMARY_COLOR,
                  fontSize: 18,
                  fontWeight: '700',
                  marginTop: 20,
                }}
                >
                  Organisateur
                </Text>

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
                >
                  <Image
                    source={{ uri: trainingData.trainingOwner.avatar }}
                    style={{
                      height: 40,
                      justifyContent: 'center',
                      width: 40,
                      borderRadius: 40 / 2,
                    }}
                  />
                  <Text numberOfLines={1} style={{ marginLeft: 10, fontSize: 16, fontWeight: '500' }}>{trainingData.trainingOwner.name}</Text>
                </View>
              </View>
            )
          }


          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
            marginTop: 20,
          }}
          >
            <Image source={ICONS.CALENDAR} style={{ width: 30, height: 30 }} />
            <Text style={{
              color: '#889B9C',
              fontSize: 15,
              marginLeft: 5,
              fontWeight: '600',
            }}
            >
              DATE
            </Text>
          </View>

          <View style={{ padding: 15, marginTop: 5, backgroundColor: '#FFF' }}>
            <Text style={{ fontWeight: '500' }} numberOfLines={1}>
              {`Le ${trainingData.fromDate} à ${trainingData.fromDate}`}
            </Text>
          </View>

          {
            trainingData.description !== '' && (
              <View style={{ backgroundColor: 'white', marginTop: 10, padding: 10 }}>
                <Text style={styles.description}>
                  {trainingData.description}
                </Text>
              </View>
            )
          }


          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 15,
            marginTop: 20,
          }}
          >
            <Image source={ICONS.PIN} style={{ width: 30, height: 30 }} />
            <Text style={{
              color: '#889B9C',
              fontSize: 15,
              marginLeft: 5,
              fontWeight: '600',
            }}
            >
              LIEU
            </Text>
          </View>

          <View style={styles.placeContainer}>
            <View style={styles.placeInfos}>
              <TouchableOpacity onPress={seeStartPosition}>
                <Text style={{ alignSelf: 'center', fontWeight: '500' }} numberOfLines={1}>{trainingData.address}</Text>
                <Text style={{ alignSelf: 'center', color: '#AFAFAF' }}>
                  Départ situé à
                  {' '}
                  {Math.round(trainingData.distanceFromUser)}
                  {' '}
                  kilomètres
                </Text>
              </TouchableOpacity>
            </View>

            {
              (Platform.OS === 'ios'
                && (!Number.isNaN(trainingData.latitude) && !Number.isNaN(trainingData.longitude)))
              && (
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: parseFloat(trainingData.latitude),
                    longitude: parseFloat(trainingData.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: parseFloat(trainingData.latitude),
                      longitude: parseFloat(trainingData.longitude),
                    }}
                  />
                </MapView>
              )
            }
          </View>
        </ScrollView>
      </View>
      <DropdownAlert ref={dropDownAlertRef} />
    </View>
  );
}

TrainingView.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,

};

export default TrainingView;
