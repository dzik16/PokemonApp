/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import database from '@react-native-firebase/database';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {IconEmail, IconName, IconPassword} from '../../../Assets/index';
import {Formik} from 'formik';
import * as yup from 'yup';
import uuid from 'react-native-uuid';

import {Color} from '../../../utils/color';

import Header from './components/header';
import FormInput from '../../../Components/FormInput';
import ScreenStatusBar from '../../../Components/ScreenStatusBar';

const RegisterScreen = props => {
  const navigation = useNavigation();
  const focus = useIsFocused();

  const registerValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    name: yup
      .string()
      .min(2, 'To Short!')
      .max(50, 'To Long!')
      .required('Required'),
    bio: yup
      .string()
      .min(2, 'To Short!')
      .max(50, 'To Long!')
      .required('Required'),
  });

  const onRegisterWithRDB = async values => {
    if (
      values.name === '' ||
      values.email === '' ||
      values.password === '' ||
      values.bio === ''
    ) {
      Alert.alert('Error', 'Harap isi Semua field');
      return false;
    }
    let data = {
      id: uuid.v4(),
      name: values.name,
      emailId: values.email,
      password: values.password,
      about: values.bio,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU',
    };
    try {
      database()
        .ref('/users/' + data.id)
        .set(data)
        .then(() => {
          props.navigation.navigate('SuksesScreen');
        });
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenStatusBar status={focus} color={Color.SECOND_MAIN_COLOR} />
      <Formik
        validationSchema={registerValidationSchema}
        initialValues={{email: '', password: '', name: '', bio: ''}}
        onSubmit={values => onRegisterWithRDB(values)}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Header />

              <FormInput
                icon={IconName}
                placeholder="Nama"
                value={values.nama}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <FormInput
                icon={IconEmail}
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                keyboardType="email-address"
                onBlur={handleBlur('email')}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <FormInput
                icon={IconPassword}
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry
                onBlur={handleBlur('password')}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <FormInput
                icon={IconPassword}
                placeholder="Bio"
                value={values.bio}
                onChangeText={handleChange('bio')}
                onBlur={handleBlur('bio')}
              />
              {errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}

              <View style={styles.containerRegist}>
                <View>
                  <Text style={{fontSize: 13, color: Color.WHITE}}>
                    Already have an Account?
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Color.WHITE,
                        fontWeight: 'bold',
                      }}>
                      Login {'>'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.btnLogin, styles.shadowProp]}
                onPress={handleSubmit}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Color.WHITE,
                    fontWeight: 'bold',
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </>
        )}
      </Formik>
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
    shadowOffset: {width: 2, height: 2},
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
