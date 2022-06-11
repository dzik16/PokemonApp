/* eslint-disable react/prop-types */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';

const HomeHeader = props => {
  const userId = props.userId;

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableOpacity
        style={[styles.wrapper, styles.shadowProp]}
        onPress={() => props.navigation.replace('LoginScreen')}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.wrapper, styles.shadowProp]}
        onPress={() =>
          props.navigation.navigate('PokeBagScreen', {userId: userId})
        }>
        <Text style={styles.btnText}>PokeBag</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  wrapper: {
    width: '45%',
    height: 40,
    backgroundColor: Color.BUTTON_AUTH,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
  },
});
