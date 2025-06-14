import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../state/ThemeContext.tsx';
import {Theme} from '../styles/theme.ts';

function CustomDrawerItem({
  text,
  onPress,
  icon,
}: {
  text: string;
  onPress: () => void;
  icon?: React.ReactNode;
}) {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text>
        {icon && <>{icon}</>}
        <Text style={styles.text}>{text}</Text>
      </Text>
    </TouchableOpacity>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    item: {
      paddingVertical: 16,
      paddingHorizontal: 4,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#ccc',
      marginHorizontal: 16,
    },
    text: {
      fontSize: 18,
      color: theme.colors.text,
    },
    icon: {
      marginRight: 8,
    },
  });

export default CustomDrawerItem;
