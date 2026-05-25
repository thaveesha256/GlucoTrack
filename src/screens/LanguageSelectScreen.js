import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';

const LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'si', label: 'Sinhala', nativeLabel: 'සිංහල' },
];

export default function LanguageSelectScreen({ navigation }) {
  const { language, setLanguage, t } = useLanguage();
  const [selected, setSelected] = useState(language);

  const handleContinue = async () => {
    await setLanguage(selected);
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.iconWrap}>
          <Ionicons name="water" size={72} color="#FFFFFF" />
        </View>
        <Text style={styles.appName}>GlucoTrack</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>{t('selectLanguage')}</Text>
        <Text style={styles.sub}>{t('selectLanguageSubtitle')}</Text>

        <View style={styles.options}>
          {LANGUAGES.map((lang) => {
            const active = selected === lang.code;
            return (
              <TouchableOpacity
                key={lang.code}
                style={[styles.option, active && styles.optionActive]}
                onPress={() => setSelected(lang.code)}
                activeOpacity={0.8}
              >
                <View style={styles.optionLeft}>
                  <View style={[styles.radioRing, active && styles.radioRingActive]}>
                    {active && <View style={styles.radioDot} />}
                  </View>
                  <View>
                    <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>
                      {lang.nativeLabel}
                    </Text>
                    {lang.nativeLabel !== lang.label && (
                      <Text style={[styles.optionSub, active && styles.optionSubActive]}>
                        {lang.label}
                      </Text>
                    )}
                  </View>
                </View>
                {active && <Ionicons name="checkmark-circle" size={22} color="#2563EB" />}
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue} activeOpacity={0.85}>
          <Text style={styles.continueBtnText}>{t('continueBtn')}</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  top: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
    textAlign: 'center',
  },
  sub: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  options: {
    gap: 10,
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  optionActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioRingActive: {
    borderColor: '#2563EB',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  optionLabelActive: {
    color: '#2563EB',
  },
  optionSub: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 1,
  },
  optionSubActive: {
    color: '#3B82F6',
  },
  continueBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
