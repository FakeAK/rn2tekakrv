import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import DateTimePicker from '@react-native-community/datetimepicker';
import isEmail from 'validator/lib/isEmail';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DropdownAlert from 'react-native-dropdownalert';
import { COLORS } from '../../common/const';
import Request from '../../api/Request';
import { API } from '../../api/API';
import TokenHelper from '../../helpers/TokenHelper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  label: {
    fontWeight: '500',
    flex: 1,
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
  registerButton: {
    height: 50,
    width: 200,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 50 / 2,
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_COLOR,
    justifyContent: 'center',
  },
  imagePicker: {
    height: 200,
    width: 200,
    borderRadius: 10,
    borderColor: '#FFF',
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  registerText: {
    fontSize: 16,
  },
});

export default function RegisterView() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthDate] = useState(new Date());
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const address = 'Epitech';
  const city = 'Paris';
  const country = 'France';
  const gender = 'male';
  const disciplines = [1, 2];
  const dropDownAlertRef = useRef();

  async function registerButtonTapped() {
    const formdata = new FormData();

    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('first_name', firstName);
    formdata.append('last_name', lastName);
    formdata.append('gender', gender);
    formdata.append('birthday', birthdate);
    formdata.append('address', address);
    formdata.append('city', city);
    formdata.append('country', country);
    formdata.append('disciplines', JSON.stringify({ disciplines }));
    formdata.append('medical_certif', {
      name: 'medical_certif.png',
      type: 'image/jpeg',
      uri: Platform.OS === 'android' ? avatar : avatar.replace('file://', ''),
    });
    formdata.append('license', {
      name: 'license.png',
      type: 'image/jpeg',
      uri: Platform.OS === 'android' ? avatar : avatar.replace('file://', ''),
    });
    formdata.append('avatar', {
      name: 'avatar.png',
      type: 'image/jpeg',
      uri: Platform.OS === 'android' ? avatar : avatar.replace('file://', ''),
    });

    try {
      const req = await Request
        .post()
        .to(API.AUTH.SIGNUP)
        .multipart()
        .payload(formdata)
        .send();

      TokenHelper.storeTokens(req.payload.access_token);
      navigate('Home');
    } catch (err) {
      dropDownAlertRef.current.alertWithType('error', 'Impossible de s\'inscrire.', err.message);
    }
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  }

  async function getPermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      await pickImage();
    }
  }

  async function chooseavatarButtonPressed() {
    await getPermission();
  }

  function changeRegisterButtonState() {
    if (isEmail(email)
      && password.length > 0
      && avatar.length > 0
      && firstName.length > 0
      && lastName.length > 0
      && birthdate < new Date()) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }

  useEffect(() => {
    changeRegisterButtonState();
  }, [email, password, firstName, lastName, avatar, birthdate]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{
          alignSelf: 'center',
          color: '#FFF',
          fontSize: 20,
          fontWeight: '600',
          marginTop: 70,
          marginBottom: 30,
        }}
        >
          REGISTER
        </Text>
        <View style={styles.fieldContainer}>
          <TextInput style={styles.input} onChangeText={(text) => setEmail(text)} />
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              EMAIL
            </Text>
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <TextInput style={styles.input} onChangeText={(text) => setPassword(text)} />
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              PASSWORD
            </Text>
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <TextInput style={styles.input} onChangeText={(text) => setFirstName(text)} />
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              FIRST NAME
            </Text>
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <TextInput style={styles.input} onChangeText={(text) => setLastName(text)} />
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              LAST NAME
            </Text>
          </View>
        </View>


        <Text style={{
          color: '#FFF',
          width: '80%',
          alignSelf: 'center',
          fontWeight: '500',
        }}
        >
          DATE DE NAISSANCE
        </Text>

        {
          Platform.OS === 'ios'
          && (
            <DateTimePicker
              style={{ backgroundColor: '#FFF', marginTop: 10 }}
              value={new Date()}
              mode="date"
              is24Hour
              display="default"
              onChange={(event, date) => setBirthDate(date)}
            />
          )
        }

        {
          Platform.OS !== 'ios' && !showPicker
          && (
            <TouchableOpacity
              style={{
                height: 50,
                alignSelf: 'center',
                width: 200,
                marginTop: 10,
                backgroundColor: COLORS.PRIMARY_COLOR,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowPicker(true)}
            >
              <Text style={{
                alignSelf: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
              >
                {
                  birthdate !== undefined
                  && birthdate.toString()
                }
              </Text>
            </TouchableOpacity>
          )
        }

        {
          Platform.OS !== 'ios' && showPicker
          && (
            <DateTimePicker
              style={{ backgroundColor: '#FFF', marginTop: 10 }}
              value={new Date()}
              mode="date"
              is24Hour
              display="default"
              onChange={(event, date) => {
                setBirthDate(date);
                setShowPicker(false);
              }}
            />
          )
        }


        <TouchableOpacity style={styles.imagePicker} onPress={chooseavatarButtonPressed}>
          {
            avatar.length > 0
            && <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="cover" />
          }

          {
            avatar.length === 0
            && (
              <Text style={{
                color: '#FFF',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              >
                Sélectionnez une image.
              </Text>
            )
          }

        </TouchableOpacity>

        <TouchableOpacity
          disabled={!isButtonEnabled}
          onPress={registerButtonTapped}
          activeOpacity={0.7}
          style={[styles.registerButton, { opacity: isButtonEnabled ? 1 : 0.5 }]}
        >
          <Text style={styles.registerText}>
            {'S\'inscrire'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar barStyle="dark-content" />
      <DropdownAlert ref={dropDownAlertRef} />
    </View>
  );
}
