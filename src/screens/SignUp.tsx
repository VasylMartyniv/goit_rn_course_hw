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
import {theme} from '../styles/theme';

const SignUp = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    navigation.navigate('LogIn');
  };

  return (
    <ScreenContainer>
      <View style={styles.formContainer}>
        <SectionTitle title="Create Account" />

        <CustomInput placeholder="Name" value={name} onChangeText={setName} />

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
          <CustomButton title="Sign Up" onPress={handleSignUp} />
        </View>

        <View style={styles.footerButton}>
          <CustomButton
            title="Log In"
            onPress={() => navigation.navigate('LogIn')}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
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
