import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { Colors, Radius, Spacing, FontSize, FontWeight, Shadows } from '../../constants/tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      style={[
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.background : Colors.accent} />
      ) : (
        <Text style={[styles.label, labelSizeStyles[size], labelVariantStyles[variant]]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontWeight: FontWeight.semibold,
  },
});

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.base },
  md: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl },
  lg: { paddingVertical: Spacing.base, paddingHorizontal: Spacing['2xl'], minHeight: 56 },
};

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: Colors.accent, ...Shadows.accent },
  secondary: { backgroundColor: Colors.surfaceElevated, borderWidth: 1, borderColor: Colors.surfaceBorder },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: Colors.error },
};

const labelSizeStyles: Record<ButtonSize, TextStyle> = {
  sm: { fontSize: FontSize.sm },
  md: { fontSize: FontSize.base },
  lg: { fontSize: FontSize.md },
};

const labelVariantStyles: Record<ButtonVariant, TextStyle> = {
  primary: { color: Colors.text },
  secondary: { color: Colors.text },
  ghost: { color: Colors.accent },
  danger: { color: Colors.text },
};
