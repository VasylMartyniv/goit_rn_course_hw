import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {darkTheme, lightTheme, Theme} from '../styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance, ColorSchemeName} from 'react-native';

type ThemeContextType = {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        } else {
          const colorScheme: ColorSchemeName = Appearance.getColorScheme();
          setIsDarkMode(colorScheme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme preference', error);
      }
    };

    loadThemePreference();
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      AsyncStorage.getItem('theme')
        .then(savedTheme => {
          if (!savedTheme) {
            setIsDarkMode(colorScheme === 'dark');
          }
        })
        .catch(error => {
          console.error('Failed to check theme preference', error);
        });
    });

    return () => subscription.remove();
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    AsyncStorage.setItem('theme', isDarkMode ? 'dark' : 'light').catch(error =>
      console.error('Failed to save theme preference', error),
    );
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  return (
    <ThemeContext.Provider value={{theme, isDarkMode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
