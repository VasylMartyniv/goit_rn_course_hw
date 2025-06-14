import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TodoItemType {
  id: string;
  title: string;
  categoryId: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
}

interface TodoContextType {
  todos: TodoItemType[];
  categories: Category[];
  addTodo: (title: string, categoryId: string) => void;
  toggleTodo: (id: string) => void;
  addCategory: (name: string) => void;
  getTodosByCategory: (categoryId: string) => TodoItemType[];
  deleteCategory: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');
        const storedCategories = await AsyncStorage.getItem('categories');

        if (storedTodos) setTodos(JSON.parse(storedTodos));
        if (storedCategories) setCategories(JSON.parse(storedCategories));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
        await AsyncStorage.setItem('categories', JSON.stringify(categories));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    saveData();
  }, [todos, categories]);

  const addTodo = (title: string, categoryId: string) => {
    const newTodo = {
      id: Date.now().toString(),
      title,
      categoryId,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    );
  };

  const addCategory = (name: string) => {
    const newCategory = {
      id: Date.now().toString(),
      name,
    };
    setCategories([...categories, newCategory]);
  };

  const getTodosByCategory = (categoryId: string) => {
    return todos.filter(todo => todo.categoryId === categoryId);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
    // Also delete all todos in this category
    setTodos(todos.filter(todo => todo.categoryId !== id));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        categories,
        addTodo,
        toggleTodo,
        addCategory,
        getTodosByCategory,
        deleteCategory,
        deleteTodo,
      }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
