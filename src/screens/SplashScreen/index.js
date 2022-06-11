/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenStatusBar from '../../Components/ScreenStatusBar';
import {Color} from '../../utils/color';
import {SplashAnim} from '../../Assets/index';

function Splash() {
  const navigation = useNavigation();
  const focus = useIsFocused();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 4000);
  }, []);

  return (
    <View style={styles.container}>
      <ScreenStatusBar status={focus} color={Color.PRIMARY_MAIN_COLOR} />
      <View style={{flex: 4}}>
        <LottieView source={SplashAnim} autoPlay loop />
      </View>
      <View style={styles.judul}>
        <Text style={styles.txtjudul}>MAPS-APP</Text>
      </View>
      <View style={styles.containerTxt}>
        <Text style={styles.txt}>By M. Dzikri Alfarisyi</Text>
      </View>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.SECOND_MAIN_COLOR,
  },
  containerTxt: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  judul: {
    flex: 1.5,
    alignContent: 'center',
    alignItems: 'center',
  },
  txtjudul: {
    fontSize: 30,
    color: Color.WHITE,
    fontWeight: 'bold',
  },
  txt: {
    color: Color.WHITE,
    fontWeight: '300',
    fontSize: 16,
  },
});
