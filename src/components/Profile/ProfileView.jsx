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
import {Tokens} from '../../common/const';

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const dropDownAlertRef = useRef();

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

  async function updateUser() {
    const formData = new FormData();

    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('avatar', avatar);
    console.log(firstName);
    console.log(lastName);
    console.log(avatar);
    try {
      await Request
      .put()
      .to(API.USER.ME)
      .multipart()
      .payload(formData)
      .send();
    } catch(err) {
      dropDownAlertRef.current.alertWithType('error', 'Une erreur est survenue.', 'Impossible d\'update les informations de votre profil.');
    }
  }

  async function getInformations() {
    try {
      const req = await await Request
      .get()
      .to(API.USER.ME)
      .send();
      setFirstName(req.user.first_name);
      setLastName(req.user.last_name);
      setAvatar(req.user.avatar);
    } catch (err) {
      console.log(err);
      dropDownAlertRef.current.alertWithType('error', 'Une erreur est survenue.', 'Impossible de récupérer les informations de votre profil.');
    }
  }

  useEffect(() => {
    getInformations();
  }, []);

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
          PROFILE
        </Text>
        <View style={styles.fieldContainer}>
          <TextInput style={styles.input} onChangeText={(text) => setFirstName(text)} value={firstName} />
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              FIRST NAME
            </Text>
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <TextInput style={styles.input} onChangeText={(text) => setLastName(text)} value={lastName} />
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              LAST NAME
            </Text>
          </View>
        </View>
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
          activeOpacity={0.7}
          onPress={updateUser}
          style={[styles.registerButton]}
        >
          <Text style={styles.registerText}>
            {'Update'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <DropdownAlert ref={dropDownAlertRef} />
    </View>
  );
}

