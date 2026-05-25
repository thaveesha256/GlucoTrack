import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const SECTIONS = [
  { icon: 'alert-circle-outline', titleKey: 'fcSec1Title', bodyKey: 'fcSec1Body' },
  { icon: 'eye-outline',          titleKey: 'fcSec2Title', bodyKey: 'fcSec2Body' },
  { icon: 'water-outline',        titleKey: 'fcSec3Title', bodyKey: 'fcSec3Body' },
  { icon: 'walk-outline',         titleKey: 'fcSec4Title', bodyKey: 'fcSec4Body' },
  { icon: 'medical-outline',      titleKey: 'fcSec5Title', bodyKey: 'fcSec5Body' },
];

export default function FootCareScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.hero}>
        <View style={[styles.heroIcon, { backgroundColor: colors.primary + '22' }]}>
          <Ionicons name="bandage-outline" size={48} color={colors.primary} />
        </View>
        <Text style={[styles.subtitle, { color: colors.subText }]}>{t('fcSubtitle')}</Text>
      </View>

      {SECTIONS.map((sec) => (
        <View key={sec.titleKey} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: colors.primary + '18' }]}>
              <Ionicons name={sec.icon} size={20} color={colors.primary} />
            </View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{t(sec.titleKey)}</Text>
          </View>
          <Text style={[styles.cardBody, { color: colors.subText }]}>{t(sec.bodyKey)}</Text>
        </View>
      ))}

      <Text style={[styles.footer, { color: colors.subText }]}>{t('fcFooter')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  hero: { alignItems: 'center', marginBottom: 24 },
  heroIcon: {
    width: 88, height: 88, borderRadius: 44,
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  card: { borderRadius: 14, padding: 16, borderWidth: 1, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  iconBox: {
    width: 36, height: 36, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
  },
  cardTitle: { fontSize: 15, fontWeight: '700', flex: 1 },
  cardBody: { fontSize: 14, lineHeight: 22 },
  footer: { fontSize: 12, fontStyle: 'italic', textAlign: 'center', marginTop: 8, lineHeight: 18 },
});
