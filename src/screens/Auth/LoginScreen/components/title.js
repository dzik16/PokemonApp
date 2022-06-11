/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const title = () => (
  <View style={styles.container}>
    <Text style={styles.txtWelcome}>Hii, Welcome</Text>
  </View>
);

export default title;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  txtWelcome: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});
