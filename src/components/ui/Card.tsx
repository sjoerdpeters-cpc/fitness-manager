import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Colors, Radius, Shadows } from '../../constants/tokens';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  elevated?: boolean;
}

export function Card({ children, elevated = false, style, ...props }: CardProps) {
  return (
    <View style={[styles.card, elevated && styles.elevated, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    overflow: 'hidden',
  },
  elevated: {
    backgroundColor: Colors.surfaceElevated,
    ...Shadows.md,
  },
});
