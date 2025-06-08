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

const LogIn = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainApp'}],
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
            onPress={() => navigation.navigate('Demo')}
          />
        </View>
        <View style={styles.footerButton}>
          <CustomButton
            title="Sign Up"
            onPress={() => navigation.navigate('SignUp')}
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
    marginTop: '30%', // Adjusted from 50% for better visibility
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  footerButton: {
    flexDirection: 'row',
    marginTop: 'auto',
    width: '100%',
  },
});

export default LogIn;
