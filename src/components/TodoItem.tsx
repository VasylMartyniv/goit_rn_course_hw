import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTodo} from '../state/TodoContext.tsx';
import {theme} from '../styles/theme.ts';

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    completed: boolean;
  };
  categoryName?: string;
}

const TodoItem = ({todo, categoryName}: TodoItemProps) => {
  const {toggleTodo, deleteTodo} = useTodo();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, todo.completed && styles.checkboxChecked]}
        onPress={() => toggleTodo(todo.id)}>
        {todo.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={[styles.title, todo.completed && styles.completedTitle]}>
          {todo.title}
        </Text>
        {categoryName && <Text style={styles.category}>{categoryName}</Text>}
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTodo(todo.id)}>
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
    shadowColor: theme.colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    color: theme.colors.neutral[900],
    fontFamily: theme.typography.fontFamily.regular,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: theme.colors.neutral[500],
  },
  category: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral[700],
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

export default TodoItem;
