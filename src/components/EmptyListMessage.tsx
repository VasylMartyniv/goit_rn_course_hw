import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface EmptyListMessageProps {
  message: string;
}

const EmptyListMessage = ({message}: EmptyListMessageProps) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default EmptyListMessage;
