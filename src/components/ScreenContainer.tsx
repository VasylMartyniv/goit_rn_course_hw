import React, {ReactNode} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

interface ScreenContainerProps {
  children: ReactNode;
  style?: object;
}

const ScreenContainer = ({children, style}: ScreenContainerProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ScreenContainer;
