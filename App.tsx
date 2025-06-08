import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import {TodoProvider} from './src/state/TodoContext';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <TodoProvider>
        <AppNavigator />
      </TodoProvider>
    </SafeAreaProvider>
  );
}

export default App;
