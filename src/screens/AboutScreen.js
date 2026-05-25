import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function AboutScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.iconWrap}>
        <View style={[styles.iconCircle, { backgroundColor: colors.primary }]}>
          <Ionicons name="water" size={56} color="#fff" />
        </View>
        <Text style={[styles.appName, { color: colors.text }]}>GlucoTrack</Text>
        <Text style={[styles.version, { color: colors.subText }]}>{t('version')}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.primary }]}>{t('aboutThisApp')}</Text>
        <Text style={[styles.body, { color: colors.text }]}>{t('aboutBody')}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.primary }]}>{t('importantDisclaimer')}</Text>
        <Text style={[styles.body, { color: colors.text }]}>{t('disclaimerBody')}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.primary }]}>{t('referenceRanges')}</Text>
        <Text style={[styles.body, { color: colors.text }]}>{t('referenceBody')}</Text>
      </View>

      <Text style={[styles.footer, { color: colors.subText }]}>{t('builtWith')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  iconWrap: { alignItems: 'center', marginBottom: 24 },
  iconCircle: {
    width: 96, height: 96, borderRadius: 48,
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  appName: { fontSize: 24, fontWeight: '700' },
  version: { fontSize: 13, marginTop: 4 },
  card: {
    padding: 16, borderRadius: 12,
    borderWidth: 1, marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  body: { fontSize: 14, lineHeight: 22 },
  footer: { fontSize: 12, textAlign: 'center', marginTop: 16 },
});
