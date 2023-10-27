import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text } from '@shared/blueprint';
import { ThemeProvider } from '@shared/providers';

export default function App() {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app! OK</Text>
        <Button title={'Hello'} />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
