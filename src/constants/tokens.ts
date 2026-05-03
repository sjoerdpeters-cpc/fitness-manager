export const Colors = {
  background: '#0A0A0A',
  surface: '#161616',
  surfaceElevated: '#1E1E1E',
  surfaceBorder: '#2A2A2A',

  accent: '#FF6B35',
  accentMuted: '#FF6B351A',
  accentSecondary: '#4ECDC4',

  text: '#FFFFFF',
  textSecondary: '#9E9E9E',
  textMuted: '#555555',

  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',

  tagBlue: '#1E3A5F',
  tagBlueText: '#4FC3F7',
  tagGreen: '#1B4332',
  tagGreenText: '#4CAF50',
  tagOrange: '#3D1A00',
  tagOrangeText: '#FF6B35',
  tagPurple: '#2D1B69',
  tagPurpleText: '#B39DDB',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 999,
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 34,
  '4xl': 40,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  accent: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;
