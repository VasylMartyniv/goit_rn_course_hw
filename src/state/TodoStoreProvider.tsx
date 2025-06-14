import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {getTodos} from './todosSlice';
import {getCategories} from './categoriesSlice';
import {useAppDispatch} from '../hooks/hooks.ts';

const DataLoader: React.FC<{children: React.ReactNode}> = ({children}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
    dispatch(getCategories());
  }, [dispatch]);

  return <>{children}</>;
};

export const TodoStoreProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <DataLoader>{children}</DataLoader>
    </Provider>
  );
};
