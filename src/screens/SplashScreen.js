import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function SplashScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const [, savedLang] = await Promise.all([
        new Promise((r) => setTimeout(r, 2500)),
        AsyncStorage.getItem('@language'),
      ]);
      if (mounted) {
        navigation.replace(savedLang ? 'Main' : 'LanguageSelect');
      }
    };
    init();
    return () => { mounted = false; };
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.iconWrap}>
        <Ionicons name="water" size={96} color="#FFFFFF" />
      </View>
      <Text style={styles.title}>GlucoTrack</Text>
      <Text style={styles.subtitle}>{t('splashSubtitle')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrap: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 8,
  },
});
