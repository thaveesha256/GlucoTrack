import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const SECTIONS = [
  { titleKey: 'insSec1Title', bodyKey: 'insSec1Body' },
  { titleKey: 'insSec2Title', bodyKey: 'insSec2Body' },
  { titleKey: 'insSec3Title', bodyKey: 'insSec3Body' },
  { titleKey: 'insSec4Title', bodyKey: 'insSec4Body' },
  { titleKey: 'insSec5Title', bodyKey: 'insSec5Body' },
  { titleKey: 'insSec6Title', bodyKey: 'insSec6Body' },
  { titleKey: 'insSec7Title', bodyKey: 'insSec7Body' },
  { titleKey: 'insSec8Title', bodyKey: 'insSec8Body' },
];

export default function InsulinScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.subtitle, { color: colors.subText }]}>{t('insSubtitle')}</Text>
      {SECTIONS.map((sec) => (
        <View key={sec.titleKey} style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>{t(sec.titleKey)}</Text>
          <Text style={[styles.body, { color: colors.text }]}>{t(sec.bodyKey)}</Text>
        </View>
      ))}
      <Text style={[styles.disclaimer, { color: colors.subText }]}>{t('insDisclaimer')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32 },
  subtitle: { fontSize: 13, marginBottom: 16, textAlign: 'center', fontStyle: 'italic' },
  section: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  body: { fontSize: 14, lineHeight: 22 },
  disclaimer: { fontSize: 12, fontStyle: 'italic', textAlign: 'center', marginTop: 8 },
});
