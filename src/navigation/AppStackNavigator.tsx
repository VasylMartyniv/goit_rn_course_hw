import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogIn from '../screens/LogIn.tsx';
import SignUp from '../screens/SignUp.tsx';
import ComponentsDemo from '../screens/ComponentsDemo.tsx';
import {MainDrawer} from './HomeDrawerNavigator.tsx';
import React from 'react';
import {SCREEN_NAMES} from '../constants/routes.ts';
import {useTheme} from '../state/ThemeContext.tsx';

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  const {theme} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LogIn} />
      <Stack.Screen name={SCREEN_NAMES.SIGN_UP} component={SignUp} />
      <Stack.Screen name={SCREEN_NAMES.DEMO} component={ComponentsDemo} />
      <Stack.Screen name={SCREEN_NAMES.MAIN_APP} component={MainDrawer} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
