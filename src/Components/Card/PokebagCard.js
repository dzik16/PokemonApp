/* eslint-disable react/prop-types */
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';

const PokebagCard = props => {
  return (
    <TouchableOpacity
      style={[styles.wrapper, styles.shadowProp]}
      onPress={props.onPress}>
      <Image
        source={{uri: props.pokemonData.pokemonImg}}
        style={{width: 100, height: 100}}
      />
      <Text style={styles.name}>{props.pokemonData.name}</Text>
    </TouchableOpacity>
  );
};

export default PokebagCard;

const styles = StyleSheet.create({
  wrapper: {
    width: 150,
    height: 150,
    backgroundColor: Color.BACKGROUND_MAIN,
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
    position: 'relative',
    alignItems: 'center',
  },
  name: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
  },
});
