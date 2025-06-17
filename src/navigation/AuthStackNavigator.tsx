import React from 'react';
import {SCREEN_NAMES} from '../constants/routes.ts';
import LogIn from '../screens/LogIn.tsx';
import SignUp from '../screens/SignUp.tsx';
import ComponentsDemo from '../screens/ComponentsDemo.tsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SCREEN_NAMES.LOGIN}>
      <AuthStack.Screen name={SCREEN_NAMES.LOGIN} component={LogIn} />
      <AuthStack.Screen name={SCREEN_NAMES.SIGN_UP} component={SignUp} />
      <AuthStack.Screen name={SCREEN_NAMES.DEMO} component={ComponentsDemo} />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
