import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { WINDOW_WIDTH, COLORS } from '../../../common/const';
import { formatDateAsString } from '../../../common/utils';
import TranslationHelper from '../../../helpers/TranslationHelper';

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

function TrainingCell(props) {
  const { training, navigation } = props;

  function cellPressed() {
    navigation.navigate('Training', { id: training.id });
  }

  return (
    <TouchableOpacity onPress={cellPressed} activeOpacity={1} style={styles.container}>
      <View style={styles.shadowBox}>
        <View style={styles.cell}>
          <View>
            <Image source={{ uri: training.photo_cover }} resizeMode="cover" style={styles.image} />
            <View style={{
              position: 'absolute',
              borderRadius: 5,
              padding: 5,
              backgroundColor: COLORS.PRIMARY_COLOR,
            }}
            >
              <Text style={styles.date}>
                {formatDateAsString(training.from).toUpperCase()}
              </Text>
            </View>
          </View>
          <View>
            <Text numberOfLines={2} style={styles.title}>
              {training.title.toUpperCase()}
            </Text>
            <Text numberOfLines={2} style={styles.address}>
              {training.city}
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.footer}>
            <View style={[styles.labelContainer, { marginLeft: 10 }]}>
              <Text style={styles.label}>
                {TranslationHelper.translate(training.disciplines[0])}
              </Text>
            </View>
            <View style={[styles.labelContainer, { marginLeft: 5, backgroundColor: '#6C6C6C' }]}>
              <Text style={[styles.label, { color: '#FFF' }]}>
                {training.nbParticipant}
                {' '}
                participants
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

TrainingCell.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  training: PropTypes.shape({
    id: PropTypes.number.isRequired,
    photo_cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    disciplines: PropTypes.arrayOf(PropTypes.string).isRequired,
    nbParticipant: PropTypes.number.isRequired,
  }).isRequired,
};

export default TrainingCell;
