import React, {memo, useEffect, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAppDispatch} from '../hooks/hooks.ts';
import {deleteTodo, toggleTodo} from '../state/todosSlice.ts';
import {useTheme} from '../state/ThemeContext.tsx';
import {Theme} from '../styles/theme.ts';

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    completed: boolean;
  };
  categoryName?: string;
}

const TodoItem = ({todo, categoryName}: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Initialize with current completion state
  const completionProgress = useSharedValue(todo.completed ? 100 : 0);

  useEffect(() => {
    // Update with animation when completed state changes
    completionProgress.value = withTiming(todo.completed ? 100 : 0, {
      duration: 500, // Slightly longer duration to make it more noticeable
    });
  }, [todo.completed, completionProgress]);

  // Define animated style with explicit width calculation
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      width: `${completionProgress.value}%`,
      opacity: 0.8, // Make it more visible
    };
  });

  const button = useMemo(
    () => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => dispatch(deleteTodo(todo.id))}>
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    ),
    [dispatch, styles.deleteButton, styles.deleteText, todo.id],
  );

  const category = useMemo(
    () => <Text style={styles.category}>{categoryName}</Text>,
    [categoryName, styles.category],
  );

  return (
    <View style={styles.outerContainer}>
      <Animated.View
        style={[styles.completionBackground, animatedBackgroundStyle]}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.checkbox, todo.completed && styles.checkboxChecked]}
          onPress={() => dispatch(toggleTodo(todo.id))}>
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={[styles.title, todo.completed && styles.completedTitle]}>
            {todo.title}
          </Text>
          {category}
        </View>
        {button}
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    outerContainer: {
      position: 'relative',
      marginBottom: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      overflow: 'hidden',
    },
    completionBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      height: '100%', // Ensure it fills the container height
      backgroundColor: theme.colors.primary[100], // Use a more visible color
      zIndex: 1,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'transparent', // Make transparent to see the background
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      shadowColor: theme.colors.black,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      zIndex: 2,
    },
    checkbox: {
      width: theme.spacing.lg,
      height: theme.spacing.lg,
      borderRadius: theme.spacing.lg / 10,
      borderWidth: 2,
      borderColor: theme.colors.primary[500],
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: theme.colors.primary[500],
    },
    checkmark: {
      color: theme.colors.white,
      fontWeight: 'bold',
    },
    textContainer: {
      flex: 1,
      marginLeft: theme.spacing.md,
    },
    title: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
      fontFamily: theme.typography.fontFamily.regular,
    },
    completedTitle: {
      textDecorationLine: 'line-through',
      color: theme.colors.neutral[500],
    },
    category: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.borderColor,
      marginTop: 2,
      fontFamily: theme.typography.fontFamily.regular,
    },
    deleteButton: {
      padding: theme.spacing.xs,
    },
    deleteText: {
      color: theme.colors.error,
      fontSize: theme.typography.fontSize.xl,
      fontWeight: 'bold',
    },
  });

export default memo(TodoItem);
