import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import {useAppDispatch} from '../hooks/hooks.ts';
import {addTodo} from '../state/todosSlice.ts';
import {useTheme} from '../state/ThemeContext.tsx';
import {Theme} from '../styles/theme.ts';

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  categoryId: string;
}

const AddTodoModal = ({visible, onClose, categoryId}: AddTodoModalProps) => {
  const [todoTitle, setTodoTitle] = useState('');
  const dispatch = useAppDispatch();
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const handleAddTodo = () => {
    if (todoTitle.trim()) {
      dispatch(addTodo({title: todoTitle.trim(), categoryId}));
      setTodoTitle('');
      onClose();
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Task</Text>

          <CustomInput
            placeholder="Task title"
            value={todoTitle}
            onChangeText={setTodoTitle}
            autoFocus={true}
          />

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Cancel"
              onPress={onClose}
              variant="secondary"
            />
            <CustomButton title="Add" onPress={handleAddTodo} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: theme.colors.backgroundLight,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: -2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: theme.colors.text,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 10,
      gap: 10,
    },
  });

export default AddTodoModal;
