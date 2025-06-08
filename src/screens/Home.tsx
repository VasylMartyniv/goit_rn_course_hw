import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useTodo} from '../state/TodoContext';
import TodoItem from '../components/TodoItem';
import AddCategoryModal from '../components/AddCategoryModal';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import EmptyListMessage from '../components/EmptyListMessage';

const Home = () => {
  const {todos, categories} = useTodo();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenContainer>
      <SectionTitle title="All Tasks" />

      {todos.length > 0 ? (
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
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

      <AddCategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default Home;
