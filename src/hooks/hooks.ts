import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../state/store.ts';
import {TodoItemType} from '../state/todosSlice.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTodos = () => useAppSelector(state => state.todos);
export const useCategories = () => useAppSelector(state => state.categories);
export const useTodosByCategory = (categoryId: string): TodoItemType[] => {
  return useAppSelector(state =>
    state.todos.filter(todo => todo.categoryId === categoryId),
  );
};
