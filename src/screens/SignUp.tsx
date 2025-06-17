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
import {Theme} from '../styles/theme';
import {SCREEN_NAMES} from '../constants/routes.ts';
import {useTheme} from '../state/ThemeContext.tsx';
import supabase from '../state/supabase.ts';
import Toast from 'react-native-toast-message';

const SignUp = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const handleSignUp = async () => {
    setLoading(true);
    const {error} = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error.message,
      });
      return;
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.formContainer}>
        <SectionTitle title="Create Account" />

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

        <CustomInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <View style={{flexDirection: 'row'}}>
          <CustomButton
            title="Sign Up"
            onPress={handleSignUp}
            isLoading={loading}
          />
        </View>

        <View style={styles.footerButton}>
          <CustomButton
            title="Log In"
            onPress={() => navigation.navigate(SCREEN_NAMES.LOGIN)}
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
      padding: theme.spacing.lg,
    },
    footerButton: {
      flexDirection: 'row',
      marginTop: 'auto',
      width: '100%',
    },
  });

export default SignUp;
