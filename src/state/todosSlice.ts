import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchTodos} from '../api/api.ts';

export interface TodoItemType {
  id: string;
  title: string;
  categoryId: string;
  completed: boolean;
}

export const getTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const storedTodos = await AsyncStorage.getItem('todos');
  const remoteTodos = (await fetchTodos()) as TodoItemType[];
  return [...(storedTodos ? JSON.parse(storedTodos) : []), ...remoteTodos];
});

export const saveTodos = createAsyncThunk(
  'todos/saveTodos',
  async (todo: TodoItemType) => {
    const storedTodos = JSON.parse((await AsyncStorage.getItem('todos')) || '');
    const newTodos = [...storedTodos, todo];
    await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    return newTodos;
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as TodoItemType[],
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{title: string; categoryId: string}>,
    ) => {
      const newTodo: TodoItemType = {
        id: Date.now().toString(),
        title: action.payload.title,
        categoryId: action.payload.categoryId,
        completed: false,
      };
      state.push(newTodo);
      saveTodos(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    deleteByCategory: (state, action: PayloadAction<string>) => {
      return state.filter(todo => todo.categoryId !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {addTodo, toggleTodo, deleteTodo, deleteByCategory} =
  todosSlice.actions;
export default todosSlice.reducer;
