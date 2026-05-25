import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { interpretBloodSugar } from '../utils/interpretBloodSugar';

const SCREEN_ICONS = {
  'Health Education': 'book-outline',
  'Exercises': 'barbell-outline',
  'Dietary Advice': 'restaurant-outline',
  'Foot Care': 'bandage-outline',
  'Sick Day Management': 'thermometer-outline',
};

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [type, setType] = useState('FBS');
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null); // TODO: persist reading history to AsyncStorage
  const [error, setError] = useState('');

  const handleDone = () => {
    Keyboard.dismiss(); // dismiss before validation avoids layout jump on Android
    const r = interpretBloodSugar(value, type);
    if (!r) {
      setError(t('invalidNumber'));
      setResult(null);
      return;
    }
    setError('');
    setResult(r);
  };

  const handleReset = () => {
    setValue('');
    setResult(null);
    setError('');
  };

  const severityColor = (sev) => {
    switch (sev) {
      case 'success': return colors.success;
      case 'warning': return colors.warning;
      case 'danger': return colors.danger;
      case 'critical': return colors.critical;
      default: return colors.primary;
    }
  };

  const unitLabel = type === 'FBS' ? 'mg/dL' : '%';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={[styles.heading, { color: colors.text }]}>{t('checkYourReading')}</Text>
        <Text style={[styles.sub, { color: colors.subText }]}>{t('selectTypeBelow')}</Text>

        {/* Type selector */}
        <View style={[styles.toggleWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {['FBS', 'HbA1c'].map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.toggleBtn, type === opt && { backgroundColor: colors.primary }]}
              onPress={() => { setType(opt); setResult(null); setError(''); }}
            >
              <Text style={[styles.toggleText, { color: type === opt ? '#fff' : colors.text }]}>
                {opt === 'FBS' ? 'FBS (mg/dL)' : 'HbA1c (%)'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Input box */}
        <View style={[styles.inputBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.inputLabel, { color: colors.subText }]}>
            {type === 'FBS' ? t('enterFBS') : t('enterHbA1c')}
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg, borderColor: colors.border }]}
              placeholder={type === 'FBS' ? 'e.g. 90' : 'e.g. 6.2'}
              placeholderTextColor={colors.subText}
              keyboardType="decimal-pad"
              value={value}
              onChangeText={(v) => { setValue(v); setError(''); }}
              returnKeyType="done"
              onSubmitEditing={handleDone}
            />
            <Text style={[styles.unit, { color: colors.subText }]}>{unitLabel}</Text>
          </View>
          {!!error && <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>}
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.doneBtn, { backgroundColor: colors.primary }]} onPress={handleDone}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.doneText}>{t('done')}</Text>
          </TouchableOpacity>
          {result && (
            <TouchableOpacity style={[styles.resetBtn, { borderColor: colors.border }]} onPress={handleReset}>
              <Ionicons name="refresh" size={18} color={colors.text} />
              <Text style={[styles.resetText, { color: colors.text }]}>{t('reset')}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Result */}
        {result && (
          <>
            {/* Category + range */}
            <View style={[styles.resultCard, {
              backgroundColor: colors.card,
              borderLeftColor: severityColor(result.severity),
              borderColor: colors.border,
            }]}>
              <Text style={[styles.resultCategory, { color: severityColor(result.severity) }]}>
                {t(result.categoryKey)}
              </Text>
              <Text style={[styles.resultRange, { color: colors.subText }]}>{result.range}</Text>
            </View>

            {/* What to do next — bullet points */}
            <View style={[styles.adviceCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.adviceHeader}>
                <Ionicons name="medkit-outline" size={20} color={colors.primary} />
                <Text style={[styles.adviceTitle, { color: colors.text }]}>{t('whatToDoNext')}</Text>
              </View>
              {result.advicePoints.map((point, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Text style={[styles.bulletDot, { color: colors.primary }]}>•</Text>
                  <Text style={[styles.bulletText, { color: colors.subText }]}>{t(point)}</Text>
                </View>
              ))}
            </View>

            {/* Related navigation links */}
            {result.relatedScreens?.length > 0 && (
              <View style={[styles.linksCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.linksHeader}>
                  <Ionicons name="library-outline" size={18} color={colors.primary} />
                  <Text style={[styles.linksTitle, { color: colors.text }]}>{t('exploreMore')}</Text>
                </View>
                {result.relatedScreens.map((screen) => (
                  <TouchableOpacity
                    key={screen.route}
                    style={[styles.linkRow, { borderColor: colors.border }]}
                    onPress={() => navigation.navigate(screen.route)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.linkIconBox, { backgroundColor: colors.primary + '18' }]}>
                      <Ionicons
                        name={SCREEN_ICONS[screen.route] ?? 'chevron-forward'}
                        size={18}
                        color={colors.primary}
                      />
                    </View>
                    <Text style={[styles.linkLabel, { color: colors.text }]}>{t(screen.labelKey)}</Text>
                    <Ionicons name="chevron-forward" size={16} color={colors.subText} />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={[styles.disclaimer, { color: colors.subText }]}>{t('disclaimer')}</Text>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  sub: { fontSize: 14, marginBottom: 20 },
  toggleWrap: {
    flexDirection: 'row', borderRadius: 12, padding: 4,
    borderWidth: 1, marginBottom: 16,
  },
  toggleBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center',
  },
  toggleText: { fontWeight: '600', fontSize: 14 },
  inputBox: { borderRadius: 12, padding: 16, borderWidth: 1, marginBottom: 16 },
  inputLabel: { fontSize: 13, marginBottom: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1, height: 52, borderWidth: 1, borderRadius: 10,
    paddingHorizontal: 14, fontSize: 18, fontWeight: '600',
  },
  unit: { marginLeft: 12, fontSize: 14, fontWeight: '600' },
  error: { marginTop: 8, fontSize: 13 },
  actions: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  doneBtn: {
    flex: 1, flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', paddingVertical: 14, borderRadius: 12, gap: 8,
  },
  doneText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  resetBtn: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, gap: 6,
  },
  resetText: { fontWeight: '600' },
  resultCard: {
    borderRadius: 12, padding: 16, borderLeftWidth: 6,
    borderWidth: 1, marginBottom: 12,
  },
  resultCategory: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  resultRange: { fontSize: 13, lineHeight: 18 },
  adviceCard: { borderRadius: 12, padding: 16, borderWidth: 1, marginBottom: 12 },
  adviceHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  adviceTitle: { fontSize: 16, fontWeight: '700' },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, gap: 8 },
  bulletDot: { fontSize: 18, lineHeight: 22, fontWeight: '700', marginTop: 1 },
  bulletText: { flex: 1, fontSize: 14, lineHeight: 21 },
  linksCard: { borderRadius: 12, padding: 16, borderWidth: 1, marginBottom: 12 },
  linksHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  linksTitle: { fontSize: 15, fontWeight: '700' },
  linkRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1, gap: 10,
  },
  linkIconBox: {
    width: 32, height: 32, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
  },
  linkLabel: { flex: 1, fontSize: 14, fontWeight: '600' },
  disclaimer: { fontSize: 12, fontStyle: 'italic', textAlign: 'center', marginTop: 8 },
});
