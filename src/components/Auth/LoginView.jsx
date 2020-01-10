import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import isEmail from 'validator/lib/isEmail';
import DropdownAlert from 'react-native-dropdownalert';
import { COLORS } from '../../common/const';
import PrimaryButton from '../common/buttons/PrimaryButton';
import { API } from '../../api/API';
import Request from '../../api/Request';
import TokenHelper from '../../helpers/TokenHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  form: {
    height: 250,
    width: '80%',
    alignSelf: 'center',
  },
  label: {
    color: '#FFF',
    fontWeight: '500',
  },
  field: {
    color: '#FFF',
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    width: '100%',
    height: 40,
  },
  loginButton: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    height: 40,
    borderRadius: 40 / 2,
  },
  registerButtonContainer: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
});

export default function LoginView() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginButtonState, setLoginButtonState] = useState(false);
  const dropDownAlertRef = useRef();

  function changeLoginButtonState() {
    if (isEmail(email) && password.length > 0) {
      setLoginButtonState(true);
    } else {
      setLoginButtonState(false);
    }
  }

  async function login() {
    try {
      const req = await Request.post().to(API.AUTH.LOGIN).payload({
        email,
        password,
      }).send();
      TokenHelper.storeTokens(req.payload.access_token);
      navigate('Home');
    } catch (err) {
      dropDownAlertRef.current.alertWithType('error', 'Impossible de se connecter.', err.message);
    }
  }

  function goToRegister() {
    navigate('Register');
  }

  useEffect(() => {
    changeLoginButtonState();
  }, [email, password]);

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={Keyboard.dismiss} activeOpacity={1}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput onChangeText={(text) => setEmail(text)} style={styles.field} />
          <Text style={[styles.label, { marginTop: 50 }]}>PASSWORD</Text>
          <TextInput onChangeText={(text) => setPassword(text)} style={styles.field} />
          <PrimaryButton
            disabled={!loginButtonState}
            buttonStyle={{ marginTop: 20, opacity: loginButtonState ? 1 : 0.5 }}
            onPress={login}
            title="Login"
          />
        </View>
      </View>
      <View style={styles.registerButtonContainer}>
        <TouchableOpacity onPress={goToRegister}>
          <Text style={{ color: '#FFF' }}>Pas de compte ? Inscrivez-vous.</Text>
        </TouchableOpacity>
      </View>
      <DropdownAlert ref={dropDownAlertRef} />
    </TouchableOpacity>
  );
}
