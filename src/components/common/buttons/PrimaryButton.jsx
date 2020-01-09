import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../common/const';

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: COLORS.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    alignSelf: 'center',
    borderRadius: 50 / 2,
  },
  title: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
});

function PrimaryButton(props) {
  const {
    onPress,
    title,
    buttonStyle,
    disabled,
  } = props;

  return (
    <TouchableOpacity disabled={disabled} style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

PrimaryButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  buttonStyle: PropTypes.shape({ subProp: PropTypes.string }),
  disabled: PropTypes.bool,
};

PrimaryButton.defaultProps = {
  buttonStyle: {},
  disabled: false,
};

export default PrimaryButton;
