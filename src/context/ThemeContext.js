import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightTheme = {
  background: '#F5F7FB',
  card: '#FFFFFF',
  text: '#0F172A',
  subText: '#475569',
  primary: '#2563EB',
  border: '#E2E8F0',
  inputBg: '#FFFFFF',
  success: '#16A34A',
  warning: '#F59E0B',
  danger: '#DC2626',
  critical: '#991B1B',
};

const darkTheme = {
  background: '#0B1220',
  card: '#111827',
  text: '#F1F5F9',
  subText: '#94A3B8',
  primary: '#3B82F6',
  border: '#1F2937',
  inputBg: '#0F172A',
  success: '#22C55E',
  warning: '#FBBF24',
  danger: '#EF4444',
  critical: '#F87171',
};

const ThemeContext = createContext({
  isDark: false,
  colors: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('@theme');
        if (saved === 'dark') setIsDark(true);
      } catch (e) {
        
      }
    })();
  }, []);

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    try {
      await AsyncStorage.setItem('@theme', next ? 'dark' : 'light');
    } catch (e) {
      
    }
  };

  const value = {
    isDark,
    colors: isDark ? darkTheme : lightTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
