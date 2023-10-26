import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@shared/blueprint'

export default function App() {
  return (
    <View style={styles.conta
    iner}>


      <Text>Open up App.js to start working on your app! OK</Text>
      <Button title={"Hello"} backgroundColor={"white"} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
