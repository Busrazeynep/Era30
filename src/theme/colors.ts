export const darkColors = {
  background: '#0a0b10',
  backgroundGradient: ['#00e2fb', '#9125ff'],
  surface: 'rgba(255, 255, 255, 0.03)',
  surfaceLight: 'rgba(255, 255, 255, 0.06)',
  text: '#ffffff',
  textSecondary: '#a0a0a0',
  accent: '#00f2ff',
  accentGlow: 'rgba(0, 242, 255, 0.5)',
  purple: '#7000ff',
  purpleGlow: 'rgba(112, 0, 255, 0.5)',
  border: 'rgba(255, 255, 255, 0.1)',
};

export const lightColors = {
  background: '#f8fafc',
  backgroundGradient: ['#ffffff', '#f1f5f9'],
  surface: 'rgba(0, 0, 0, 0.04)',
  surfaceLight: 'rgba(0, 0, 0, 0.07)',
  text: '#0a0a0a',
  textSecondary: '#555555',
  accent: '#007aff',
  accentGlow: 'rgba(0, 122, 255, 0.5)',
  purple: '#6200ea',
  purpleGlow: 'rgba(98, 0, 234, 0.5)',
  border: 'rgba(0, 0, 0, 0.1)',
};

export type ColorScheme = typeof darkColors;

// Default export for backwards-compat — will be overridden by ThemeContext
export const colors = darkColors;
