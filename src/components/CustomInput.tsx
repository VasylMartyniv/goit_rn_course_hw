import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Theme} from '../styles/theme';
import {useTheme} from '../state/ThemeContext.tsx';

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: object;
  autoFocus?: boolean;
}

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
  autoFocus = false,
}: CustomInputProps) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoFocus={autoFocus}
      placeholderTextColor={theme.colors.borderColor}
    />
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      width: '100%',
      height: theme.spacing.xxl + theme.spacing.xs,
      borderWidth: 1,
      borderColor: theme.colors.neutral[300],
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.inputColor,
      fontSize: theme.typography.fontSize.md,
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.text,
    },
  });

export default CustomInput;
