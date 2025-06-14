import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../state/ThemeContext.tsx';
import {Theme} from '../styles/theme.ts';

interface AddButtonProps {
  onPress: () => void;
}

const AddButton = ({onPress}: AddButtonProps) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    addButton: {
      position: 'absolute',
      right: theme.spacing.lg,
      bottom: theme.spacing.lg,
      width: theme.spacing.xxl + theme.spacing.lg,
      height: theme.spacing.xxl + theme.spacing.lg,
      borderRadius: (theme.spacing.xxl + theme.spacing.lg) / 2,
      backgroundColor: theme.colors.primary[500],
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.colors.black,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
    addButtonText: {
      color: theme.colors.white,
      fontSize: theme.typography.fontSize.xl,
      lineHeight: theme.typography.fontSize.xl,
    },
  });

export default AddButton;
