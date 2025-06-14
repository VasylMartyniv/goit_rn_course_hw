import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text} from 'react-native';
import {fetchCategories, fetchTodos} from '../api/api';
import TodoItem from '../components/TodoItem';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import EmptyListMessage from '../components/EmptyListMessage';
import {Category, TodoItemType} from '../state/TodoContext.tsx';

const Home = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [todosData, categoriesData] = await Promise.all([
          fetchTodos(),
          fetchCategories(),
        ]);
        setTodos(todosData);
        setCategories(categoriesData);
      } catch (err: any) {
        setError(err.message || 'Error loading data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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
      <SectionTitle title="All Tasks" />
      {todos.length > 0 ? (
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TodoItem
              todo={item}
              categoryName={
                categories.find(cat => cat.id === item.categoryId)?.name ||
                'Uncategorized'
              }
            />
          )}
          style={styles.list}
        />
      ) : (
        <EmptyListMessage message="No tasks yet. Add some tasks to get started!" />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default Home;
