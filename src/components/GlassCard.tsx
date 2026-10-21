import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../theme/ThemeContext';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  intensity?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, style, contentStyle, intensity = 15 }) => {
  const { colors, mode } = useTheme();
  const s = StyleSheet.create({
    container: {
      borderRadius: 30,
      overflow: 'hidden',
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 8,
    },
    content: { padding: 24 },
  });

  return (
    <View style={[s.container, style]}>
      <BlurView intensity={intensity} style={StyleSheet.absoluteFill} tint={mode === 'dark' ? 'dark' : 'light'} />
      <View style={[s.content, contentStyle]}>{children}</View>
    </View>
  );
};
