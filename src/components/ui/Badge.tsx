import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, FontSize, FontWeight } from '../../constants/tokens';

type BadgeVariant = 'accent' | 'blue' | 'green' | 'purple' | 'muted';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  accent: { bg: Colors.tagOrange, text: Colors.tagOrangeText },
  blue: { bg: Colors.tagBlue, text: Colors.tagBlueText },
  green: { bg: Colors.tagGreen, text: Colors.tagGreenText },
  purple: { bg: Colors.tagPurple, text: Colors.tagPurpleText },
  muted: { bg: Colors.surfaceElevated, text: Colors.textSecondary },
};

export function Badge({ label, variant = 'muted' }: BadgeProps) {
  const vs = variantStyles[variant];
  return (
    <View style={[styles.badge, { backgroundColor: vs.bg }]}>
      <Text style={[styles.label, { color: vs.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    letterSpacing: 0.3,
  },
});
