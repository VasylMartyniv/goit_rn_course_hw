import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent.tsx';
import Home from '../screens/Home.tsx';
import CategoryScreen from '../screens/CategoryScreen.tsx';
import React from 'react';
import {SCREEN_NAMES} from '../constants/routes.ts';
import {useTheme} from '../state/ThemeContext.tsx';

const Drawer = createDrawerNavigator();

export const MainDrawer = () => {
  const {theme} = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerType: 'front',
        headerTintColor: theme.colors.primary[500],
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
        drawerStyle: {
          backgroundColor: theme.colors.backgroundLight,
        },
      }}>
      <Drawer.Screen name={SCREEN_NAMES.HOME} component={Home} />
      <Drawer.Screen
        name={SCREEN_NAMES.CATEGORY}
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
