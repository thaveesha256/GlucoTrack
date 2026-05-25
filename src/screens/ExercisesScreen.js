import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const cards = [
  { titleKey: 'exTitle1', bodyKey: 'exBody1' },
  { titleKey: 'exTitle2', bodyKey: 'exBody2' },
  { titleKey: 'exTitle3', bodyKey: 'exBody3' },
  { titleKey: 'exTitle4', bodyKey: 'exBody4' },
  { titleKey: 'exTitle5', bodyKey: 'exBody5' },
  { titleKey: 'exTitle6', bodyKey: 'exBody6' },
  { titleKey: 'exTitle7', bodyKey: 'exBody7' }, 
];

export default function ExercisesScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      {cards.map((card) => (
        <View key={card.titleKey} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.primary }]}>{t(card.titleKey)}</Text>
          <Text style={[styles.body, { color: colors.text }]}>{t(card.bodyKey)}</Text>
        </View>
      ))}
      <Text style={[styles.disclaimer, { color: colors.subText }]}>{t('exDisclaimer')}</Text>
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
