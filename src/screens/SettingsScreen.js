import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'si', label: 'සිංහල' },
];

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  // TODO: connect expo-notifications for real scheduling
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(false);

  const Item = ({ icon, label, value, onValueChange }) => (
    <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Ionicons name={icon} size={22} color={colors.primary} />
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor="#fff"
      />
    </View>
  );

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.section, { color: colors.subText }]}>{t('sectionAppearance')}</Text>
      <Item icon="moon-outline" label={t('darkMode')} value={isDark} onValueChange={toggleTheme} />

      <Text style={[styles.section, { color: colors.subText }]}>{t('sectionNotifications')}</Text>
      <Item icon="notifications-outline" label={t('enableNotifications')} value={notifications} onValueChange={setNotifications} />
      <Item icon="alarm-outline" label={t('readingReminders')} value={reminders} onValueChange={setReminders} />

      <Text style={[styles.section, { color: colors.subText }]}>{t('sectionLanguage')}</Text>
      <View style={[styles.langCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.langHeader}>
          <Ionicons name="language-outline" size={22} color={colors.primary} />
          <Text style={[styles.label, { color: colors.text }]}>{t('appLanguage')}</Text>
        </View>
        <View style={styles.langOptions}>
          {LANGUAGES.map((lang) => {
            const active = language === lang.code;
            return (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.langBtn,
                  { borderColor: active ? colors.primary : colors.border },
                  active && { backgroundColor: colors.primary + '18' },
                ]}
                onPress={() => setLanguage(lang.code)}
                activeOpacity={0.8}
              >
                {active && (
                  <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
                )}
                <Text
                  style={[
                    styles.langBtnText,
                    { color: active ? colors.primary : colors.subText },
                    active && { fontWeight: '700' },
                  ]}
                >
                  {lang.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  section: { fontSize: 12, fontWeight: '700', marginTop: 12, marginBottom: 8, letterSpacing: 1 },
  row: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, borderRadius: 12,
    borderWidth: 1, marginBottom: 8, gap: 12,
  },
  label: { flex: 1, fontSize: 15 },
  langCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  langHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  langOptions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  langBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    gap: 6,
  },
  langBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
