import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shared/providers';

import { AppNavigation } from './navigation/AppNavigation';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
