import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainDrawer} from './HomeDrawerNavigator.tsx';
import React, {useCallback, useContext, useEffect} from 'react';
import {SCREEN_NAMES} from '../constants/routes.ts';
import {SessionContext} from '../state/SessionContext.tsx';
import supabase from '../state/supabase.ts';
import AuthStackNavigator from './AuthStackNavigator.tsx';

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  const {session, setSession} = useContext(SessionContext);

  const verifySession = useCallback(() => {
    supabase.auth.getSession().then(({data: {session: userSession}}) => {
      setSession(userSession);
    });
  }, [setSession]);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        session ? SCREEN_NAMES.MAIN_APP : SCREEN_NAMES.AUTH_STACK
      }>
      {!session ? (
        <Stack.Screen
          name={SCREEN_NAMES.AUTH_STACK}
          component={AuthStackNavigator}
        />
      ) : (
        <Stack.Screen name={SCREEN_NAMES.MAIN_APP} component={MainDrawer} />
      )}
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
