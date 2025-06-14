import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import {TodoStoreProvider} from './src/state/TodoStoreProvider';
import {ThemeProvider} from './src/state/ThemeContext';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TodoStoreProvider>
          <AppNavigator />
        </TodoStoreProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
