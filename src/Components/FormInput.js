/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import {StyleSheet, View, TextInput, Image} from 'react-native';
import React from 'react';
import {Color} from '../utils/color';

function FormInput({
  icon,
  placeholder,
  value,
  secureTextEntry,
  keyboardType,
  onChangeText,
}) {
  return (
    <View style={[styles.containerInput, styles.shadowProp]}>
      <View style={styles.iconInput}>
        <Image source={icon} style={styles.icon} />
      </View>
      <View style={styles.txtInput}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
}

export default FormInput;

const styles = StyleSheet.create({
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
});
