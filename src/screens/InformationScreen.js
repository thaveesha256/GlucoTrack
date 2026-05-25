import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function InformationScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const items = [
    {
      labelKey: 'healthEducation',
      icon: 'book-outline',
      descKey: 'healthEducationDesc',
      route: 'Health Education',
    },
    {
      labelKey: 'exercises',
      icon: 'barbell-outline',
      descKey: 'exercisesDesc',
      route: 'Exercises',
    },
    {
      labelKey: 'dietaryAdvice',
      icon: 'restaurant-outline',
      descKey: 'dietaryAdviceDesc',
      route: 'Dietary Advice',
    },
    {
      labelKey: 'footCare',
      icon: 'bandage-outline',
      descKey: 'footCareDesc',
      route: 'Foot Care',
    },
    {
      labelKey: 'sickDayManagement',
      icon: 'thermometer-outline',
      descKey: 'sickDayManagementDesc',
      route: 'Sick Day Management',
    },
    {
      labelKey: 'insulinInfo',
      icon: 'flask-outline',
      descKey: 'insulinInfoDesc',
      route: 'Insulin Information',
    },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.heading, { color: colors.text }]}>{t('learnAndImprove')}</Text>
      <Text style={[styles.sub, { color: colors.subText }]}>{t('reliableInfo')}</Text>

      {items.map((item) => (
        <TouchableOpacity
          key={item.route}
          style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => navigation.navigate(item.route)}
          activeOpacity={0.8}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.primary + '22' }]}>
            <Ionicons name={item.icon} size={28} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{t(item.labelKey)}</Text>
            <Text style={[styles.cardDesc, { color: colors.subText }]}>{t(item.descKey)}</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={colors.subText} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  sub: { fontSize: 14, marginBottom: 20 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, borderRadius: 14, borderWidth: 1, marginBottom: 12, gap: 12,
  },
  iconCircle: {
    width: 52, height: 52, borderRadius: 26,
    justifyContent: 'center', alignItems: 'center',
  },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  cardDesc: { fontSize: 13, lineHeight: 18 },
});
