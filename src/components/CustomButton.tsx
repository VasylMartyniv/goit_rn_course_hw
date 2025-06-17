import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Theme} from '../styles/theme';
import {useTheme} from '../state/ThemeContext.tsx';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: object;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  style,
  isLoading = false,
}: CustomButtonProps) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        style,
      ]}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={
            variant === 'primary'
              ? styles.primaryButtonText
              : styles.secondaryButtonText
          }>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      flex: 1,
      height: theme.spacing.xxl + theme.spacing.xs,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.borderRadius.md,
      marginTop: theme.spacing.md,
    },
    primaryButton: {
      backgroundColor: theme.colors.primary[500],
    },
    secondaryButton: {
      backgroundColor: theme.colors.backgroundLight,
      borderWidth: 1.5,
      borderColor: theme.colors.primary[500],
    },
    primaryButtonText: {
      color: theme.colors.white,
      fontSize: theme.typography.fontSize.sm,
      fontFamily: theme.typography.fontFamily.bold,
      fontWeight: 600,
    },
    secondaryButtonText: {
      color: theme.colors.primary[500],
      fontSize: theme.typography.fontSize.sm,
      fontFamily: theme.typography.fontFamily.bold,
      fontWeight: 600,
    },
  });

export default CustomButton;
