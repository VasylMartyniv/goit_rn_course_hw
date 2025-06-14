import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStackNavigator from './AppStackNavigator.tsx';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
