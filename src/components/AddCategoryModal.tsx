import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useTodo} from '../state/TodoContext';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import {theme} from '../styles/theme';

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddCategoryModal = ({visible, onClose}: AddCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState('');
  const {addCategory} = useTodo();

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      addCategory(categoryName.trim());
      setCategoryName('');
      onClose();
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Add New Category</Text>

              <CustomInput
                placeholder="Category name"
                value={categoryName}
                onChangeText={setCategoryName}
                autoFocus={true}
              />

              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Cancel"
                  onPress={onClose}
                  variant="secondary"
                  style={styles.buttonStyle}
                />
                <CustomButton
                  title="Add"
                  onPress={handleAddCategory}
                  style={styles.buttonStyle}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    shadowColor: theme.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.md,
    color: theme.colors.neutral[900],
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonStyle: {
    width: theme.spacing.xxl * 2 + theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
});

export default AddCategoryModal;
