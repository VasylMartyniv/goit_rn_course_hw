import React, {useState} from 'react';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {StyleSheet, View} from 'react-native';
import {SCREEN_NAMES} from '../constants/routes.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Theme} from '../styles/theme.ts';
import {useTheme} from '../state/ThemeContext.tsx';

const LogIn = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {theme, toggleTheme} = useTheme();
  const styles = createStyles(theme);

  const handleLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{name: SCREEN_NAMES.MAIN_APP}],
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.formContainer}>
        <SectionTitle title="Log In" />

        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={{flexDirection: 'row', width: '100%'}}>
          <CustomButton title="Log In" onPress={handleLogin} />
        </View>

        <View style={{flexDirection: 'row', width: '100%'}}>
          <CustomButton
            title="Demo"
            onPress={() => {
              AsyncStorage.clear();
              navigation.navigate(SCREEN_NAMES.DEMO);
            }}
          />
        </View>

        <View style={{flexDirection: 'row', width: '100%'}}>
          <CustomButton title="Toggle Theme" onPress={toggleTheme} />
        </View>
        <View style={styles.footerButton}>
          <CustomButton
            title="Sign Up"
            onPress={() => navigation.navigate(SCREEN_NAMES.SIGN_UP)}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    formContainer: {
      flex: 1,
      justifyContent: 'center',
      marginTop: '30%',
      alignItems: 'center',
      padding: 20,
    },
    footerButton: {
      flexDirection: 'row',
      marginTop: 'auto',
      width: '100%',
    },
  });

export default LogIn;
