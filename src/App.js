/* eslint-disable no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CodePush from 'react-native-code-push';
import Router from './Router/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Persistore, Store} from './Config/Redux/Store';

const CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    // appendReleaseDescription: true,
    title: 'a new update is available!',
  },
};

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistore}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default CodePush(CodePushOptions)(App);

const styles = StyleSheet.create({});
