/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { LoginImage } from '../../../../Assets';

const header = () => (
  <View style={styles.container}>
    <Image style={styles.img} source={LoginImage} />
  </View>
);

export default header;

const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  img: {
    width: 280,
    height: 300,
  },
});
