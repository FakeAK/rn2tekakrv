import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import DropdownAlert from 'react-native-dropdownalert';
import { API } from '../../api/API';
import Request from '../../api/Request';
import { COLORS } from '../../common/const';
import EventCell from './cells/EventCell';
import TrainingCell from './cells/TrainingCell';
import StoreCell from './cells/StoreCell';

let eventsPage = 1;
let trainingsPage = 1;
let storesPage = 1;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  sectionTitleContainer: {
    height: 30,
    marginLeft: 10,
    borderRadius: 7,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY_COLOR,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 12,
    alignSelf: 'center',
  },
});

function Home(props) {
  const [events, setEvents] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [stores, setStores] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const dropDownAlertRef = useRef();

  async function getEvents() {
    try {
      const req = await Request.get().to(API.FEED.GET_EVENTS(1, true)).send();
      setEvents(req.payload.events);
      eventsPage += 1;
    } catch (err) {
      dropDownAlertRef.current.alertWithType('error', 'Une erreur est survenue.', 'Impossible de récupérer les événements.');
    }
  }

  async function loadMoreEvents() {
    try {
      const req = await Request.get().to(API.FEED.GET_EVENTS(eventsPage, false)).send();
      const newEvents = Array.from(new Set([...events, ...req.payload.events]))
        .filter((v, i, a) => a.findIndex((t) => (JSON.stringify(t) === JSON.stringify(v))) === i);
      setEvents(newEvents);
      eventsPage += 1;
    } catch (err) {
      dropDownAlertRef.current.alertWithType('error', 'Une erreur est survenue.', 'Impossible de récupérer plus d\'événements.');
    }
  }

  async function getTrainings() {
    try {
      const req = await Request.get().to(API.FEED.GET_TRAININGS(1, true)).send();
      setTrainings(req.payload);
      trainingsPage += 1;
    } catch (err) {
      dropDownAlertRef.current.alertWithType('error', 'Une erreur est survenue.', 'Impossible de récupérer les entraînements.');
    }
  }

  async function loadMoreTrainings() {
    try {
      const req = await Request.get().to(API.FEED.GET_TRAININGS(trainingsPage, false)).send();
      const newTrainings = Array.from(new Set([...trainings, ...req.payload]))
        .filter((v, i, a) => a.findIndex((t) => (JSON.stringify(t) === JSON.stringify(v))) === i);
      setTrainings(newTrainings);
      trainingsPage += 1;
    } catch (err) {
      dropDownAlertRef.current.alertWithType('error', 'Une erreur est survenue.', 'Impossible de récupérer plus d\'entraînements.');
    }
  }

  async function getStores() {
    let latitude = null;
    let longitude = null;

    if (userLocation && userLocation.coords.latitude && userLocation.coords.longitude) {
      latitude = userLocation.coords.latitude;
      longitude = userLocation.coords.longitude;

      try {
        const req = await Request.get().to(API.FEED.GET_STORES(1, latitude, longitude)).send();
        setStores(req.payload);
        storesPage += 1;
      } catch (err) {
        dropDownAlertRef.current.alertWithType('error', 'Une erreur est survenue.', 'Impossible de récupérer les magasins.');
      }
    }
  }

  async function loadMoreStores() {
    let latitude = null;
    let longitude = null;

    if (userLocation) {
      latitude = userLocation.coords.latitude;
      longitude = userLocation.coords.longitude;
    }

    try {
      const req = await Request
        .get()
        .to(API.FEED.GET_STORES(storesPage, latitude, longitude))
        .send();
      setStores(Array.from(new Set([...stores, ...req.payload])));
      storesPage += 1;
    } catch (err) {
      dropDownAlertRef.current.alertWithType('error', 'Une erreur est survenue.', 'Impossible de récupérer plus de magasins.');
    }
  }

  async function getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    let location = null;

    if (status === 'granted') {
      location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });
    }
    setUserLocation(location);
  }

  useEffect(() => {
    getLocationAsync();
  }, []);

  useEffect(() => {
    getStores();
    getEvents();
    getTrainings();
  }, [userLocation]);

  return (
    <View style={styles.view}>
      <StatusBar barStyle="dark-content" hidden={false} showHideTransition="slide" />
      <ScrollView>
        <View style={[styles.sectionTitleContainer, { width: 170 }]}>
          <Text adjustsFontSizeToFit style={styles.sectionTitle}>ÉVÉNEMENTS À LA UNE</Text>
        </View>

        <FlatList
          style={{ flex: 1, marginTop: 10 }}
          data={events}
          extraData={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <EventCell event={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          onEndReached={loadMoreEvents}
          removeClippedSubviews
          onEndReachedThreshold={0.2}
          horizontal
        />

        <View style={[styles.sectionTitleContainer, { width: 130, marginTop: 20 }]}>
          <Text adjustsFontSizeToFit style={styles.sectionTitle}>ENTRAÎNEMENTS</Text>
        </View>

        <FlatList
          style={{ flex: 1, marginTop: 10 }}
          data={trainings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TrainingCell training={item} navigation={props.navigation} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          onEndReached={loadMoreTrainings}
          removeClippedSubviews
          onEndReachedThreshold={0.2}
          horizontal
        />

        <View style={[styles.sectionTitleContainer, { width: 90, marginTop: 20 }]}>
          <Text adjustsFontSizeToFit style={styles.sectionTitle}>MAGASINS</Text>
        </View>

        <FlatList
          style={{ flex: 1, marginTop: 10 }}
          data={stores}
          extraData={stores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <StoreCell store={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          onEndReached={loadMoreStores}
          removeClippedSubviews
          onEndReachedThreshold={0.2}
          horizontal
        />
      </ScrollView>
      <DropdownAlert ref={dropDownAlertRef} />
    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default Home;
