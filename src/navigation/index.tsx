import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import CategoryScreen from '../screens/CategoryScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import ComponentsDemo from '../screens/ComponentsDemo.tsx';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerType: 'front',
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="Category"
        component={CategoryScreen}
        options={({route}) => ({
          title:
            (route.params as {categoryName?: string})?.categoryName ||
            'Category',
        })}
      />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Demo" component={ComponentsDemo} />
        <Stack.Screen name="MainApp" component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
