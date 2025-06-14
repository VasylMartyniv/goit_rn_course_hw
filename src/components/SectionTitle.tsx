import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from '../state/ThemeContext.tsx';
import {Theme} from '../styles/theme.ts';

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({title}: SectionTitleProps) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return <Text style={styles.title}>{title}</Text>;
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    title: {
      width: '100%',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 16,
      color: theme.colors.text,
    },
  });

export default SectionTitle;
