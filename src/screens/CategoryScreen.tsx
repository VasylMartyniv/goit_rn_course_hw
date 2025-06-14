import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {fetchTodos} from '../api/api';
import TodoItem from '../components/TodoItem';
import type {TodoItemType as TodoItemType} from '../state/TodoContext';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import EmptyListMessage from '../components/EmptyListMessage';

type CategoryScreenRouteProp = RouteProp<
  {
    Category: {categoryId: string; categoryName: string};
  },
  'Category'
>;

const CategoryScreen = () => {
  const route = useRoute<CategoryScreenRouteProp>();
  const {categoryId, categoryName} = route.params;
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const allTodos = await fetchTodos();
        setTodos(
          allTodos.filter((todo: any) => todo.categoryId === categoryId),
        );
      } catch (err: any) {
        setError(err.message || 'Error loading todos');
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, [categoryId]);

  if (loading) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <Text style={{color: 'red'}}>{error}</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <SectionTitle title={categoryName} />
      {todos.length > 0 ? (
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <TodoItem todo={item} />}
          style={styles.list}
        />
      ) : (
        <EmptyListMessage message="No tasks in this category yet. Add some tasks to get started!" />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default CategoryScreen;
