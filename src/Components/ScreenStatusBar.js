/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
import { StatusBar } from 'react-native';
import React from 'react';

function ScreenStatusBar(props) {
  const { color } = props;

  return props.status ? (
    <StatusBar backgroundColor={color} barStyle="dark-content" />
  ) : null;
}

export default ScreenStatusBar;
