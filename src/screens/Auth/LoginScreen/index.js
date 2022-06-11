import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import database from '@react-native-firebase/database';
import {Formik} from 'formik';
import * as yup from 'yup';

import ScreenStatusBar from '../../../Components/ScreenStatusBar';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {IconEmail, IconPassword} from '../../../Assets';
import {Color} from '../../../utils/color';

import Header from './components/header';
import Title from './components/title';
import FormInput from '../../../Components/FormInput';

const LoginScreen = () => {
  const navigation = useNavigation();
  const focus = useIsFocused();

  const onLoginRDB = values => {
    try {
      database()
        .ref('/users/')
        .orderByChild('emailId')
        .equalTo(values.email)
        .once('value')
        .then(async snapshot => {
          if (snapshot.val() == null) {
            Alert.alert('Invalid Email Id');
            return false;
          }
          let userData = Object.values(snapshot.val())[0];
          if (userData?.password != values.password) {
            Alert.alert('Error', 'Invalid Password!');
            return false;
          }
          console.log('User data: ', userData);
          navigation.replace('HomeScreen', {userData: userData});
        });
    } catch (error) {
      Alert.alert('Error', 'Not Found User');
    }
  };
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScreenStatusBar status={focus} color={Color.SECOND_MAIN_COLOR} />
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => onLoginRDB(values)}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header />

            <Title />

            <FormInput
              icon={IconEmail}
              placeholder="Email"
              value={values.email}
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <FormInput
              icon={IconPassword}
              placeholder="Password"
              onBlur={handleBlur('password')}
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <View style={styles.containerRegist}>
              <View>
                <Text style={{fontSize: 15, color: Color.WHITE}}>
                  Dont have an account?
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('RegisterScreen')}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.WHITE,
                      fontWeight: 'bold',
                    }}>
                    Sign Up {'>'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.btnLogin, styles.shadowProp]}
              onPress={handleSubmit}>
              <Text
                style={{fontSize: 15, color: Color.WHITE, fontWeight: 'bold'}}>
                Login
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
    marginHorizontal: 5,
  },
  iconInput: {
    flex: 1,
    alignSelf: 'center',
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
    marginTop: 40,
    marginBottom: 10,
  },
});
