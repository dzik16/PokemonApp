import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './Stack';
import {navigationRef} from './navigate';

const index = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Router />
    </NavigationContainer>
  );
};

export default index;
