/* eslint-disable no-alert */
import {
  StyleSheet, Text, View, SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { IconEmail, IconName, IconPassword } from '../../../Assets/index';
import { Color } from '../../../utils/color';

import Header from './components/header';
import FormInput from '../../../Components/FormInput';
import ScreenStatusBar from '../../../Components/ScreenStatusBar';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [nama, setNama] = React.useState('');
  const [password, setPassword] = React.useState('');
  const focus = useIsFocused();

  const formChecker = () => {
    const emailRegEx = /[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-z]/;
    const emailStatus = emailRegEx.test(email); // Boolean

    if (email.length === 0 && password.length === 0) {
      Alert.alert('Error', 'Empty form, Please fill form correctly!');
    } else if (emailStatus && password.length >= 8) {
      sendData()
    } else {
      Alert.alert('Error', 'Invalid Form!');
    }
  };

  const sendData = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.replace('SuksesScreen')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenStatusBar status={focus} color={Color.SECOND_MAIN_COLOR} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <FormInput
          icon={IconName}
          placeholder="Nama"
          value={nama}
          onChangeText={(text) => setNama(text)}
        />

        <FormInput
          icon={IconEmail}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        <FormInput
          icon={IconPassword}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <View style={styles.containerRegist}>
          <View>
            <Text style={{ fontSize: 13, color: Color.WHITE }}>
              Already have an Account?
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text
                style={{ fontSize: 15, color: Color.WHITE, fontWeight: 'bold' }}
              >
                Login
                {' '}
                {'>'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.btnLogin, styles.shadowProp]}
          onPress={() => formChecker()}
        >

          <Text
            style={{ fontSize: 15, color: Color.WHITE, fontWeight: 'bold' }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.PRIMARY_MAIN_COLOR,
    paddingHorizontal: 25,
  },
  containerInput: {
    flexDirection: 'row',
    backgroundColor: Color.WHITE,
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  iconInput: {
    flex: 1,
    alignSelf: 'center',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
  },
  icon: {
    width: 25,
    height: 27,
    marginLeft: 10,
  },
  txtInput: {
    flex: 5,
  },
  containerRegist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  btnLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.BUTTON_AUTH,
    paddingVertical: 13,
    borderRadius: 30,
    marginTop: 60,
    marginBottom: 10,
    marginHorizontal: 5,
  },
});
