import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import TodoItem from '../components/TodoItem';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import EmptyListMessage from '../components/EmptyListMessage';
import AddButton from '../components/AddButton.tsx';
import {useTodosByCategory} from '../hooks/hooks.ts';
import AddTodoModal from '../components/AddTodoModal.tsx';

type CategoryScreenRouteProp = RouteProp<
  {
    Category: {categoryId: string; categoryName: string};
  },
  'Category'
>;

const CategoryScreen = () => {
  const route = useRoute<CategoryScreenRouteProp>();
  const {categoryId, categoryName} = route.params;
  const todos = useTodosByCategory(categoryId);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenContainer>
      <SectionTitle title={categoryName} />
      {todos.length > 0 ? (
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString() + item.title}
          renderItem={({item}) => <TodoItem todo={item} />}
          style={styles.list}
        />
      ) : (
        <EmptyListMessage message="No tasks in this category yet. Add some tasks to get started!" />
      )}
      <AddButton onPress={() => setModalVisible(true)} />
      <AddTodoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        categoryId={categoryId}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default CategoryScreen;
