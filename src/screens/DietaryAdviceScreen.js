import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// plate method first — sets context before the food lists, better reading flow
const CARDS = [
  { titleKey: 'daTitle1', bodyKey: 'daBody1' },
  { titleKey: 'daTitle2', bodyKey: 'daBody2' },
  { titleKey: 'daTitle3', bodyKey: 'daBody3' },
  { titleKey: 'daTitle4', bodyKey: 'daBody4' },
  { titleKey: 'daTitle5', bodyKey: 'daBody5' },
  { titleKey: 'daTitle6', bodyKey: 'daBody6' },
  { titleKey: 'daTitle7', bodyKey: 'daBody7' },
  { titleKey: 'daTitle8', bodyKey: 'daBody8' },
];

export default function DietaryAdviceScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      {CARDS.map((card) => (
        <View key={card.titleKey} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.primary }]}>{t(card.titleKey)}</Text>
          <Text style={[styles.body, { color: colors.text }]}>{t(card.bodyKey)}</Text>
        </View>
      ))}
      <Text style={[styles.disclaimer, { color: colors.subText }]}>{t('daDisclaimer')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32 },
  card: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  body: { fontSize: 14, lineHeight: 22 },
  disclaimer: { fontSize: 12, fontStyle: 'italic', textAlign: 'center', marginTop: 8 },
});
