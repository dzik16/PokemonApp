import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CodePush from 'react-native-code-push';

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
    <View>
      <Text>Coba</Text>
    </View>
  );
};

export default CodePush(CodePushOptions)(App);

const styles = StyleSheet.create({});
