import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import TranslationHelper from '../../../helpers/TranslationHelper';
import { WINDOW_WIDTH, COLORS } from '../../../common/const';
import { formatDateAsString } from '../../../common/utils';

const styles = StyleSheet.create({
  container: {
    height: 210,
    width: WINDOW_WIDTH / 2 - 10,
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cell: {
    width: '95%',
    height: 200,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  date: {
    fontSize: 10,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 100,
  },
  title: {
    marginLeft: 10,
    marginTop: 3,
    color: '#FF9C34',
    fontWeight: '600',
    height: 40,
  },
  address: {
    marginLeft: 10,
    marginTop: 2,
    fontSize: 10,
    height: 25,
    fontStyle: 'italic',
  },
  separator: {
    height: 1,
    backgroundColor: '#D8D8D8',
  },
  footer: {
    backgroundColor: '#F3F3F3',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 2,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    alignSelf: 'center',
  },
});

function EventCell(props) {
  const { event } = props;

  return (
    <TouchableOpacity activeOpacity={1} style={styles.container}>
      <View style={styles.shadowBox}>
        <View style={styles.cell}>
          <View>
            <Image source={{ uri: event.photo_cover }} resizeMode="cover" style={styles.image} />
            <View style={{
              position: 'absolute',
              borderRadius: 5,
              padding: 5,
              backgroundColor: COLORS.PRIMARY_COLOR,
            }}
            >
              <Text style={styles.date}>
                {formatDateAsString(event.from).toUpperCase()}
              </Text>
            </View>
          </View>
          <View>
            <Text numberOfLines={2} style={styles.title}>
              {event.title.toUpperCase()}
            </Text>
            <Text numberOfLines={2} style={styles.address}>
              {event.city}
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.footer}>
            <View style={[styles.labelContainer, { marginLeft: 10 }]}>
              <Text style={styles.label}>{TranslationHelper.translate(event.disciplines[0])}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

EventCell.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    photo_cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    disciplines: PropTypes.arrayOf(PropTypes.string).isRequired,
    interestedPeopleCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default EventCell;
