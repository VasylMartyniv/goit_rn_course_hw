import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchCategories} from '../api/api.ts';

export interface Category {
  id: string;
  name: string;
}

export const getCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const storedCategories = await AsyncStorage.getItem('categories');
    const remoteCategories = (await fetchCategories()) as Category[];
    return [
      ...(storedCategories ? JSON.parse(storedCategories) : []),
      ...remoteCategories,
    ];
  },
);

export const saveCategories = createAsyncThunk(
  'categories/saveCategories',
  async (category: Category) => {
    const storedCategories = JSON.parse(
      (await AsyncStorage.getItem('categories')) || '',
    );
    const newCategories = [...storedCategories, category];
    await AsyncStorage.setItem('categories', JSON.stringify(newCategories));
    return newCategories;
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [] as Category[],
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: action.payload,
      };
      state.push(newCategory);
      saveCategories(newCategory);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      return state.filter(category => category.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {addCategory, deleteCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;
