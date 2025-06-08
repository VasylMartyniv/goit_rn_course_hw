import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {useTodo} from '../state/TodoContext';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  categoryId: string;
}

const AddTodoModal = ({visible, onClose, categoryId}: AddTodoModalProps) => {
  const [todoTitle, setTodoTitle] = useState('');
  const {addTodo} = useTodo();

  const handleAddTodo = () => {
    if (todoTitle.trim()) {
      addTodo(todoTitle.trim(), categoryId);
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    gap: 10,
  },
});

export default AddTodoModal;
