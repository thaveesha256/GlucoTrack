import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const SECTIONS = [
  { icon: 'stats-chart-outline',   titleKey: 'htuSec1Title', bodyKey: 'htuSec1Body', step: '1' },
  { icon: 'checkmark-circle-outline', titleKey: 'htuSec2Title', bodyKey: 'htuSec2Body', step: '2' },
  { icon: 'swap-horizontal-outline', titleKey: 'htuSec3Title', bodyKey: 'htuSec3Body', step: '3' },
  { icon: 'library-outline',       titleKey: 'htuSec4Title', bodyKey: 'htuSec4Body', step: '4' },
  { icon: 'settings-outline',      titleKey: 'htuSec5Title', bodyKey: 'htuSec5Body', step: '5' },
];

export default function HowToUseScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.hero}>
        <View style={[styles.heroIcon, { backgroundColor: colors.primary + '22' }]}>
          <Ionicons name="help-circle-outline" size={48} color={colors.primary} />
        </View>
        <Text style={[styles.subtitle, { color: colors.subText }]}>{t('htuSubtitle')}</Text>
      </View>

      {SECTIONS.map((sec) => (
        <View key={sec.titleKey} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.stepBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.stepText}>{sec.step}</Text>
            </View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{t(sec.titleKey)}</Text>
          </View>
          <View style={styles.cardBody}>
            <Ionicons name={sec.icon} size={16} color={colors.subText} style={styles.bodyIcon} />
            <Text style={[styles.bodyText, { color: colors.subText }]}>{t(sec.bodyKey)}</Text>
          </View>
        </View>
      ))}
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
  stepBadge: {
    width: 28, height: 28, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
  },
  stepText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  cardTitle: { fontSize: 15, fontWeight: '700', flex: 1 },
  cardBody: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  bodyIcon: { marginTop: 3 },
  bodyText: { flex: 1, fontSize: 14, lineHeight: 22 },
});
