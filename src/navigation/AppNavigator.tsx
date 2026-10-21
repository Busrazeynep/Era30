import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LockScreen } from '../screens/LockScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { FeaturesScreen } from '../screens/FeaturesScreen';
import { CameraScreen } from '../screens/CameraScreen';
import { PerformanceScreen } from '../screens/PerformanceScreen';
import { DesignScreen } from '../screens/DesignScreen';
import { GMAIDetailsScreen } from '../screens/GMAIDetailsScreen';
import { useTheme } from '../theme/ThemeContext';

export const navigationRef = createNavigationContainerRef();

export type RootStackParamList = {
  Lock: undefined;
  Home: undefined;
  Features: undefined;
  Camera: undefined;
  Performance: undefined;
  Design: undefined;
  GMAIDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { colors, mode } = useTheme();
  const baseTheme = mode === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer 
      ref={navigationRef}
      theme={{
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: colors.accent,
        background: colors.background,
        card: colors.background,
        text: colors.text,
        border: colors.border,
        notification: colors.accent,
      }
    }}>
      <Stack.Navigator 
        initialRouteName="Lock" 
        screenOptions={{ 
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        <Stack.Screen name="Lock" component={LockScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Features" component={FeaturesScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Performance" component={PerformanceScreen} />
        <Stack.Screen name="Design" component={DesignScreen} />
        <Stack.Screen name="GMAIDetails" component={GMAIDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
