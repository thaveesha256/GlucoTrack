import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import SplashScreen from '../screens/SplashScreen';
import LanguageSelectScreen from '../screens/LanguageSelectScreen';
import HomeScreen from '../screens/HomeScreen';
import InformationScreen from '../screens/InformationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HealthEducationScreen from '../screens/HealthEducationScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import DietaryAdviceScreen from '../screens/DietaryAdviceScreen';
import FootCareScreen from '../screens/FootCareScreen';
import SickDayManagementScreen from '../screens/SickDayManagementScreen';
import InsulinScreen from '../screens/InsulinScreen';
import HowToUseScreen from '../screens/HowToUseScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subText,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'ellipse';
          if (route.name === 'Information') iconName = 'information-circle-outline';
          if (route.name === 'Home') iconName = 'home-outline';
          if (route.name === 'Profile') iconName = 'person-circle-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Information"
        component={InformationScreen}
        options={{ title: t('tabInformation') }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: t('tabHome') }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: t('tabProfile') }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Health Education" component={HealthEducationScreen} options={{ title: t('screenHealthEducation') }} />
      <Stack.Screen name="Exercises" component={ExercisesScreen} options={{ title: t('screenExercises') }} />
      <Stack.Screen name="Dietary Advice" component={DietaryAdviceScreen} options={{ title: t('screenDietaryAdvice') }} />
      <Stack.Screen name="Foot Care" component={FootCareScreen} options={{ title: t('screenFootCare') }} />
      <Stack.Screen name="Sick Day Management" component={SickDayManagementScreen} options={{ title: t('screenSickDay') }} />
      <Stack.Screen name="How to Use" component={HowToUseScreen} options={{ title: t('screenHowToUse') }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: t('screenSettings') }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: t('screenAbout') }} />
      <Stack.Screen name="Insulin Information" component={InsulinScreen} options={{ title: t('screenInsulinInfo') }} />
    </Stack.Navigator>
  );
}
