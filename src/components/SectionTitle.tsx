import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({title}: SectionTitleProps) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 16,
  },
});

export default SectionTitle;
