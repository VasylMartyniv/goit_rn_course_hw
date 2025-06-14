import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import TodoItem from '../components/TodoItem';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import EmptyListMessage from '../components/EmptyListMessage';
import {useCategories, useTodos} from '../hooks/hooks.ts';

const Home = () => {
  const todos = useTodos();
  const categories = useCategories();

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
