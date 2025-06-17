import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {Session} from '@supabase/supabase-js';
import supabase from './supabase.ts';
import {ActivityIndicator} from 'react-native';

type SessionContextType = {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  isLoading?: boolean;
};

export const SessionContext = createContext<SessionContextType>({
  session: null,
  setSession: () => null,
});

type SessionProviderProps = {
  children: ReactNode;
};

export const SessionProvider = ({children}: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
      setIsLoading(false);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SessionContext.Provider value={{session, isLoading, setSession}}>
      {isLoading ? <ActivityIndicator /> : children}
    </SessionContext.Provider>
  );
};
