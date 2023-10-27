import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@shared/blueprint';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Button title={'HOME'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;
