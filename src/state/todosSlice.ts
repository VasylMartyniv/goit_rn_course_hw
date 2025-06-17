import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import supabase from './supabase.ts';

export interface TodoItemType {
  id: string;
  title: string;
  categoryId: string;
  completed: boolean;
  user_id?: string;
}

export const getTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (user_id: string) => {
    const {data, error} = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user_id);

    if (error) {
      console.error('Error fetching todos:', error);
      return [];
    }
    return data as TodoItemType[];
  },
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (todo: Omit<TodoItemType, 'id'>) => {
    const {data, error} = await supabase.from('todos').insert([todo]).select();
    if (error) throw error;
    return data?.[0] as TodoItemType;
  },
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: string) => {
    const {error} = await supabase.from('todos').delete().eq('id', id);
    if (error) throw error;
    return id;
  },
);

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async ({id, completed}: {id: string; completed: boolean}) => {
    const {data, error} = await supabase
      .from('todos')
      .update({completed})
      .eq('id', id)
      .select();
    if (error) throw error;
    return data?.[0] as TodoItemType;
  },
);

export const deleteByCategory = createAsyncThunk(
  'todos/deleteByCategory',
  async (categoryId: string) => {
    const {error} = await supabase
      .from('todos')
      .delete()
      .eq('categoryId', categoryId);
    if (error) throw error;
    return categoryId;
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as TodoItemType[],
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTodos.fulfilled, (_, action) => action.payload)
      .addCase(addTodo.fulfilled, (state, action) => {
        if (action.payload) state.push({...action.payload});
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        return state.filter(todo => todo.id !== action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const idx = state.findIndex(todo => todo.id === action.payload.id);
        if (idx !== -1) state[idx] = action.payload;
      })
      .addCase(deleteByCategory.fulfilled, (state, action) => {
        return state.filter(todo => todo.categoryId !== action.payload);
      });
  },
});

export default todosSlice.reducer;
