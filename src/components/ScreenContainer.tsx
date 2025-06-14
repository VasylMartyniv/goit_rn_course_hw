import React, {ReactNode} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useTheme} from '../state/ThemeContext.tsx';
import {Theme} from '../styles/theme.ts';

interface ScreenContainerProps {
  children: ReactNode;
  style?: object;
}

const ScreenContainer = ({children, style}: ScreenContainerProps) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      padding: 16,
    },
  });

export default ScreenContainer;
