import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import supabase from './supabase.ts';

export interface Category {
  id: string;
  name: string;
  user_id?: string;
}

export const getCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (user_id: string) => {
    const {data, error} = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', user_id);

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    return data as Category[];
  },
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (category: Omit<Category, 'id'>) => {
    const {data, error} = await supabase
      .from('categories')
      .insert([category])
      .select();
    if (error) throw error;
    return data?.[0] as Category;
  },
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string) => {
    const {error} = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    return id;
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [] as Category[],
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategories.fulfilled, (_, action) => action.payload)
      .addCase(addCategory.fulfilled, (state, action) => {
        if (action.payload) state.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        return state.filter(category => category.id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;
