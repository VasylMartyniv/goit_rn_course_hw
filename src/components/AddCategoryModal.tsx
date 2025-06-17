import React, {useContext, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import {Theme} from '../styles/theme';
import {useAppDispatch} from '../hooks/hooks.ts';
import {addCategory} from '../state/categoriesSlice.ts';
import {useTheme} from '../state/ThemeContext.tsx';
import {SessionContext} from '../state/SessionContext.tsx';

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddCategoryModal = ({visible, onClose}: AddCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState('');
  const dispatch = useAppDispatch();
  const {session} = useContext(SessionContext);
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const handleAddCategory = async () => {
    if (categoryName.trim()) {
      const res = await dispatch(
        addCategory({name: categoryName.trim(), user_id: session?.user.id}),
      );
      console.log(res);
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: theme.colors.backgroundLight,
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
      color: theme.colors.text,
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
