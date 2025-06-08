import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useTodo} from '../state/TodoContext';
import TodoItem from '../components/TodoItem';
import AddTodoModal from '../components/AddTodoModal';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import EmptyListMessage from '../components/EmptyListMessage';
import AddButton from '../components/AddButton';

type CategoryScreenRouteProp = RouteProp<
  {
    Category: {categoryId: string; categoryName: string};
  },
  'Category'
>;

const CategoryScreen = () => {
  const route = useRoute<CategoryScreenRouteProp>();
  const {categoryId, categoryName} = route.params;
  const {getTodosByCategory} = useTodo();
  const [modalVisible, setModalVisible] = useState(false);

  const categoryTodos = getTodosByCategory(categoryId);

  return (
    <ScreenContainer>
      <SectionTitle title={categoryName} />

      {categoryTodos.length > 0 ? (
        <FlatList
          data={categoryTodos}
          keyExtractor={item => item.id}
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
