import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const sections = [
  { titleKey: 'heTitle1', bodyKey: 'heBody1' },
  { titleKey: 'heTitle2', bodyKey: 'heBody2' },
  { titleKey: 'heTitle3', bodyKey: 'heBody3' },
  { titleKey: 'heTitle4', bodyKey: 'heBody4' },
  { titleKey: 'heTitle5', bodyKey: 'heBody5' },
  { titleKey: 'heTitle6', bodyKey: 'heBody6' },
];

export default function HealthEducationScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      {sections.map((sec) => (
        <View key={sec.titleKey} style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>{t(sec.titleKey)}</Text>
          <Text style={[styles.body, { color: colors.text }]}>{t(sec.bodyKey)}</Text>
        </View>
      ))}
      <Text style={[styles.disclaimer, { color: colors.subText }]}>{t('heDisclaimer')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32 },
  section: {
    padding: 16, borderRadius: 12,
    borderWidth: 1, marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  body: { fontSize: 14, lineHeight: 22 },
  disclaimer: { fontSize: 12, fontStyle: 'italic', textAlign: 'center', marginTop: 8 },
});
