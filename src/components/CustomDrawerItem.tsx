import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

function CustomDrawerItem({
  text,
  onPress,
  icon,
}: {
  text: string;
  onPress: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text>
        {icon && <>{icon}</>}
        <Text style={styles.text}>{text}</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    color: '#000',
  },
  icon: {
    marginRight: 8,
  },
});

export default CustomDrawerItem;
