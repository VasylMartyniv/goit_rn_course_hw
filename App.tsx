import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import {TodoStoreProvider} from './src/state/TodoStoreProvider';
import {ThemeProvider} from './src/state/ThemeContext';
import Toast from 'react-native-toast-message';
import {SessionProvider} from './src/state/SessionContext.tsx';

function App(): React.JSX.Element {
  return (
    <>
      <SafeAreaProvider>
        <SessionProvider>
          <ThemeProvider>
            <TodoStoreProvider>
              <AppNavigator />
            </TodoStoreProvider>
          </ThemeProvider>
        </SessionProvider>
      </SafeAreaProvider>
      <Toast />
    </>
  );
}

export default App;
