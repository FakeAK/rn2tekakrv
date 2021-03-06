import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  label: {
    fontWeight: '500',
    width: '100%',
    color: '#FFF',
  },
  labelContainer: {
    position: 'relative',
    bottom: 58,
    left: 20,
    height: 20,
    alignSelf: 'flex-start',
    backgroundColor: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: '#FFF',
    padding: 5,
    borderWidth: 1,
    borderColor: '#FFF',
    height: 50,
    width: '100%',
    borderRadius: 5,
  },
  fieldContainer: {
    alignSelf: 'center',
    width: '80%',
    height: 80,
    marginTop: 10,
  },
});

export default function RegisterInput({ label, onChange }) {
  return (
    <View style={styles.fieldContainer}>
      <TextInput style={styles.input} onChangeText={(text) => onChange(text)} />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {label}
        </Text>
      </View>
    </View>
  );
}

RegisterInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
