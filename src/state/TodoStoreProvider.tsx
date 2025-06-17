import React, {useContext, useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {getTodos} from './todosSlice';
import {getCategories} from './categoriesSlice';
import {useAppDispatch} from '../hooks/hooks.ts';
import {SessionContext} from './SessionContext.tsx';

const DataLoader: React.FC<{children: React.ReactNode}> = ({children}) => {
  const dispatch = useAppDispatch();
  const {session, isLoading} = useContext(SessionContext);

  useEffect(() => {
    if (isLoading || !session?.user) {
      return;
    }
    dispatch(getTodos(session?.user.id || ''));
    dispatch(getCategories(session?.user.id || ''));
  }, [session, isLoading, dispatch]);

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
